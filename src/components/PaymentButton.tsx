"use client"

import { Cart, PaymentSession } from "@medusajs/medusa"
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { placeOrder } from "@/actions/checkout-actions"
import { Loader2 } from "lucide-react"

type PaymentButtonProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ cart, "data-testid": dataTestId }) => {
   const notReady = !cart || !cart.shipping_address || !cart.billing_address || !cart.email || cart.shipping_methods.length < 1 ? true : false

   const paidByGiftcard = cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

   if (paidByGiftcard) {
      return <GiftCardPaymentButton />
   }

   const paymentSession = cart.payment_session as PaymentSession

   switch (paymentSession.provider_id) {
      case "stripe":
         return (
            <StripePaymentButton
               notReady={notReady}
               cart={cart}
               data-testid={dataTestId}
            />
         )
      case "manual":
         return (
            <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
         )
      case "paypal":
         return (
            <PayPalPaymentButton
               notReady={notReady}
               cart={cart}
               data-testid={dataTestId}
            />
         )
      default:
         return <Button disabled>Select a payment method</Button>
   }
}

const GiftCardPaymentButton = () => {
   const [submitting, setSubmitting] = useState(false)

   const handleOrder = async () => {
      setSubmitting(true)
      await placeOrder()
   }

   return (
      <Button
         disabled={submitting}
         onClick={handleOrder}
         data-testid="submit-order-button"
      >
         Place order 
         {submitting && <Loader2 className="w-4 h-4 ml-1 animate-spin"/>}
      </Button>
   )
}

const StripePaymentButton = ({ cart, notReady, "data-testid": dataTestId }: { cart: Omit<Cart, "refundable_amount" | "refunded_total">, notReady: boolean, "data-testid"?: string }) => {
   const [submitting, setSubmitting] = useState(false)
   const [errorMessage, setErrorMessage] = useState<string | null>(null)

   const onPaymentCompleted = async () => {
      await placeOrder().catch(() => {
         setErrorMessage("An error occurred, please try again.")
         setSubmitting(false)
      })
   }

   const stripe = useStripe()
   const elements = useElements()
   const card = elements?.getElement("card")

   const session = cart.payment_session as PaymentSession

   const disabled = !stripe || !elements ? true : false

   const handlePayment = async () => {
      setSubmitting(true)

      if (!stripe || !elements || !card || !cart) {
         setSubmitting(false)
         return
      }

      await stripe.confirmCardPayment(session.data.client_secret as string, {
         payment_method: {
            card: card,
            billing_details: {
               name:
               cart.billing_address.first_name +
               " " +
               cart.billing_address.last_name,
               address: {
               city: cart.billing_address.city ?? undefined,
               country: cart.billing_address.country_code ?? undefined,
               line1: cart.billing_address.address_1 ?? undefined,
               line2: cart.billing_address.address_2 ?? undefined,
               postal_code: cart.billing_address.postal_code ?? undefined,
               state: cart.billing_address.province ?? undefined,
               },
               email: cart.email,
               phone: cart.billing_address.phone ?? undefined,
            },
         }}).then(({ error, paymentIntent }) => {
            if (error) {
               const pi = error.payment_intent

               if ((pi && pi.status === "requires_capture") || (pi && pi.status === "succeeded")) {
                  onPaymentCompleted()
               }

               setErrorMessage(error.message || null)
               
               return
            }

            if ((paymentIntent && paymentIntent.status === "requires_capture") || paymentIntent.status === "succeeded") {
               return onPaymentCompleted()
            }

            return
         }
      )
   }

   return (
      <>
         <Button
            disabled={disabled || notReady || submitting}
            onClick={handlePayment}
            data-testid={dataTestId}
         >
            Place order
            {submitting && <Loader2 className="w-4 h-4 ml-1 animate-spin"/>}
         </Button>
         
         {errorMessage && <p className="text-red-500 mt-4 font-semibold">{errorMessage}</p>}
      </>
   )
}

const PayPalPaymentButton = ({ cart, notReady, "data-testid": dataTestId }: { cart: Omit<Cart, "refundable_amount" | "refunded_total">, notReady: boolean, "data-testid"?: string }) => {
   const [submitting, setSubmitting] = useState(false)
   const [errorMessage, setErrorMessage] = useState<string | null>(null)

   const onPaymentCompleted = async () => {
      await placeOrder().catch(() => {
         setErrorMessage("An error occurred, please try again.")
         setSubmitting(false)
      })
   }

   const session = cart.payment_session as PaymentSession

   const handlePayment = async (_data: OnApproveData, actions: OnApproveActions) => {
      actions?.order?.authorize().then((authorization) => {
         if (authorization.status !== "COMPLETED") {
            setErrorMessage(`An error occurred, status: ${authorization.status}`)
            return
         }
         onPaymentCompleted()
         }).catch(() => {
            setErrorMessage(`An unknown error occurred, please try again.`)
            setSubmitting(false)
         }
      )
   }

  const [{ isPending, isResolved }] = usePayPalScriptReducer()

   if (isPending) {
      return <Loader2 className="animate-spin text-muted-foreground"/>
   }

   if (isResolved) {
      return (
         <>
            <PayPalButtons
               style={{ layout: "horizontal" }}
               createOrder={async () => session.data.id as string}
               onApprove={handlePayment}
               disabled={notReady || submitting || isPending}
               data-testid={dataTestId}
            />
            
            {errorMessage && <p className="text-red-500 font-semibold">{errorMessage}</p>}
         </>
      )
   }
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
   const [submitting, setSubmitting] = useState(false)
   const [errorMessage, setErrorMessage] = useState<string | null>(null)

   const onPaymentCompleted = async () => {
      await placeOrder().catch((err) => {
         setErrorMessage(err.toString())
         setSubmitting(false)
      })
   }

   const handlePayment = () => {
      setSubmitting(true)

      onPaymentCompleted()
   }

   return (
      <>
         <Button
         disabled={notReady || submitting}
         onClick={handlePayment}
         data-testid="submit-order-button"
         >
         Place order
         {submitting && <Loader2 className="w-4 h-4 ml-1 animate-spin"/>}
         </Button>
         
         {errorMessage && <p className="text-red-500 font-semibold">{errorMessage}</p>}
      </>
   )
}

export default PaymentButton
