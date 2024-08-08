"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Cart } from "@medusajs/medusa"
import { setPaymentMethod } from "@/actions/checkout-actions"
import { cn } from "@/lib/utils"
import { CircleCheck, CreditCard, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { StripeContext } from "./wrappers/PaymentWrapper"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import { RadioGroup } from "./ui/radio-group"
import PaymentContainer from "./PaymentContainer"
import { paymentInfoMap } from "@/lib/constants"
import { CardElement } from "@stripe/react-stripe-js"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"

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
               fontFamily: "Inter, san-serif",
               color: "#424270",
               "::placeholder": {
                  color: "rgb(107 114 128)",
               },
            },
         },
         classes: {
            base: "pt-3 pb-1 block w-full h-11 px-4 mt-0 border border-[rgb(240,5.9%,90%)] rounded-md appearance-none focus:outline-none hover:border-zinc-800 transition-all duration-300 ease-in-out",
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
            <h2 className={cn("my-8 flex items-center gap-2 text-xl md:text-2xl lg:text-3xl font-semibold text-zinc-800", {
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
                        <div className="mt-6 transition-all duration-150 ease-in-out">
                           <Label className="pb-3 block">Enter your card details:</Label>
                           
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
               ): paidByGiftcard ? (
                  <div>
                     <p className="font-medium mb-1">
                        Payment method
                     </p>
                     <p className="text-sm text-muted-foreground" data-testid="payment-method-summary">
                        Gift card
                     </p>
                  </div>
               ): (
                  <div className="flex flex-col items-center justify-center px-4 py-16">
                     <Loader2 className="text-muted-foreground animate-spin"/>
                  </div>
               )}
               
               {error && <p className="pt-2 text-red-500 text-medium">{error}</p>}
               
               <Button
                  className="mt-6"
                  onClick={handleSubmit}
                  disabled={
                     (isStripe && !cardComplete) ||
                     (!cart?.payment_session && !paidByGiftcard) || isLoading
                  }
                  data-testid="submit-payment-button"
               >
                  Continue to review 
                  {isLoading && <Loader2 className="w-4 h-4 ml-1 animate-spin"/>}
               </Button>
            </div>
            
            <div className={isOpen ? "hidden" : "block"}>
               {cart && paymentReady && cart.payment_session ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <div>
                        <p className="font-medium mb-1">
                           Payment method
                        </p>
                        <p className="text-sm text-muted-foreground" data-testid="payment-method-summary">
                           {paymentInfoMap[cart.payment_session.provider_id]?.title || cart.payment_session.provider_id}
                        </p>
                     </div>
                     <div>
                        <p className="font-medium mb-1">
                           Payment details
                        </p>
                        <div className="flex gap-2 text-sm text-muted-foreground items-center" data-testid="payment-details-summary">
                           <div>
                              {paymentInfoMap[cart.payment_session.provider_id]?.icon || (
                                 <CreditCard className="w-5 h-5 text-muted-foreground"/>
                              )}
                           </div>
                           <p>
                              {cart.payment_session.provider_id === "stripe" && cardBrand ? cardBrand : "Another step will appear"}
                           </p>
                        </div>
                     </div>
                  </div>
               ) : paidByGiftcard ? (
                  <div>
                     <p className="font-medium mb-1">
                        Payment method
                     </p>
                     <p className="text-sm text-muted-foreground" data-testid="payment-method-summary">
                        Gift card
                     </p>
                  </div>
               ) : null}
            </div>
         </div>
         
         <Separator className="bg-zinc-100 mt-8"/>
      </>
   )
}

export default Payment
