"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Cart } from "@medusajs/medusa"
import { setPaymentMethod } from "@/actions/checkout-actions"
import { cn } from "@/lib/utils"
import { CircleCheck } from "lucide-react"
import { Button } from "./ui/button"
import { StripeContext } from "./wrappers/PaymentWrapper"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import { RadioGroup } from "./ui/radio-group"
import PaymentContainer from "./PaymentContainer"
import { paymentInfoMap } from "@/lib/constants"
import { CardElement } from "@stripe/react-stripe-js"

const Payment = ({ cart }: { cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null }) => {
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)
   const [cardBrand, setCardBrand] = useState<string | null>(null)
   const [cardComplete, setCardComplete] = useState(false)
   
   const searchParams = useSearchParams()
   const router = useRouter()
   const pathname = usePathname()
 
   const isOpen = searchParams.get("step") === "payment"
   
   const isStripe = cart?.payment_session?.provider_id === "stripe"
   const stripeReady = useContext(StripeContext)
   
   const paidByGiftcard = cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0
   
   const paymentReady = (cart?.payment_session && cart?.shipping_methods.length !== 0)
   
   const useOptions: StripeCardElementOptions = useMemo(() => {
      return {
         style: {
            base: {
               fontFamily: "Raleway, sans-serif",
               color: "#424270",
               "::placeholder": {
                  color: "rgb(107 114 128)",
               },
            },
         },
         classes: {
            base: "bg-red-200 pt-3 pb-1 block w-full h-11 px-4 mt-0 border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out",
         },
      }
   }, [])
   
   const createQueryString = useCallback(
      (name: string, value: string) => {
         const params = new URLSearchParams(searchParams)
         params.set(name, value)
   
         return params.toString()
      },
      [searchParams]
   )
   
   const set = async (providerId: string) => {
      setIsLoading(true)
      await setPaymentMethod(providerId).catch((err) => setError(err.toString()))
      .finally(() => {
         if (providerId === "paypal") return
         setIsLoading(false)
      })
   }
  
   const handleChange = (providerId: string) => {
      setError(null)
      set(providerId)
   }
  
   const handleEdit = () => {
      router.push(pathname + "?" + createQueryString("step", "payment"), {
         scroll: false,
      })
   }
   
   const handleSubmit = () => {
      setIsLoading(true)
      router.push(pathname + "?" + createQueryString("step", "review"), {
         scroll: false,
      })
   }
   
   useEffect(() => {
      setIsLoading(false)
      setError(null)
   }, [isOpen])

   return (
      <>
         <div className="flex items-center justify-between mb-6">
            <h2 className={cn("flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-zinc-800", {
               "opacity-50 pointer-events-none select-none": !isOpen && !paymentReady
            })}>
               Payment
               {!isOpen && paymentReady && <CircleCheck className="w-5 h-5 text-muted-foreground"/>}
            </h2>
            {!isOpen && paymentReady && (
               <Button
                  variant="ghost"
                  onClick={handleEdit}
                  data-testid="edit-address-button"
               >
                  Edit
               </Button>
            )}
         </div>
         
         <div>
            <div className={isOpen ? "block" : "hidden"}>
               {!paidByGiftcard && cart?.payment_sessions?.length ? (
                  <>
                     <RadioGroup defaultValue={cart.payment_session?.provider_id} className="grid gap-4">
                        {cart.payment_sessions
                           .sort((a, b) => {
                              return a.provider_id > b.provider_id ? 1 : -1
                           }).map((paymentSession) => (
                              <PaymentContainer 
                                 paymentInfoMap={paymentInfoMap}
                                 paymentSession={paymentSession}
                                 key={paymentSession.id}
                                 handleChange={handleChange}
                                 selectedPaymentOptionId={
                                    cart.payment_session?.provider_id || null
                                 }
                              />
                           ))
                        }
                     </RadioGroup>
                     
                     {isStripe && stripeReady && (
                        <div className="mt-5 transition-all duration-150 ease-in-out">
                           <p>Enter your card details:</p>
                           
                           <CardElement
                              options={useOptions as StripeCardElementOptions}
                              onChange={(e) => {
                                 setCardBrand(e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1))
                                 setError(e.error?.message || null)
                                 setCardComplete(e.complete)
                              }}
                           />
                        </div>
                     )}
                  </>
               ): (
                  <div className="p-4 bg-red-200"></div>
               )}
            </div>
         </div>
      </>
   )
}

export default Payment
