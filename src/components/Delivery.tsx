"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CircleCheck, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { Cart } from "@medusajs/medusa"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { setShippingMethod } from "@/actions/checkout-actions"
import { PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import { Label } from "./ui/label"
import { formatAmount } from "@/lib/util/prices"
import { Separator } from "./ui/separator"

interface DeliveryProps{
   cart: Omit<Cart, "refundable_amount" | "refunded_total">
   availableShippingMethods: PricedShippingOption[] | null
}

const Delivery = ({ cart, availableShippingMethods }: DeliveryProps ) => {
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)
   
   const searchParams = useSearchParams()
   const router = useRouter()
   const pathname = usePathname()
   const params = useParams()   
   
   const isOpen = searchParams.get("step") === "delivery"
   
   const handleEdit = () => {
      router.push(pathname + "?step=delivery", { scroll: false })
   }
   
   const handleSubmit = () => {
      setIsLoading(true)
      router.push(pathname + "?step=payment", { scroll: false })
   }
   
   const set = async (id: string) => {
      setIsLoading(true)
      await setShippingMethod(id).then(() => setIsLoading(false))
      .catch((err) => {
         setError(err.toString())
         setIsLoading(false)
      })
   }
   
   const handleChange = (value: string) => {
      set(value)
   }
      
   useEffect(() => {
      setIsLoading(false)
      setError(null)
   }, [isOpen])
    
   return (
      <>
         <div className="flex items-center justify-between mb-6">
            <h2 className={cn("flex items-center gap-2 text-xl md:text-2xl lg:text-3xl font-semibold text-zinc-800", {
               "opacity-50 pointer-events-none select-none": !isOpen && cart.shipping_methods.length === 0,
            })}>
               Delivery
               {!isOpen && cart.shipping_methods.length > 0 && <CircleCheck className="w-5 h-5 text-muted-foreground"/>}
            </h2>
            {!isOpen && cart?.shipping_address && cart?.billing_address && cart?.email && (
               <Button
                  variant="ghost"
                  onClick={handleEdit}
                  data-testid="edit-address-button"
               >
                  Edit
               </Button>
            )}
         </div>
         
         {isOpen ? (
            <div data-testid="delivery-options-container">
               <div className="pb-8">
                  <RadioGroup defaultValue={cart.shipping_methods[0]?.shipping_option_id} className="grid gap-4">
                     {availableShippingMethods ? (
                        availableShippingMethods.map((option) => (
                           <div
                              onClick={() => {
                                 handleChange(option.id as string)
                              }} 
                              key={option.id} className={cn("flex gap-2 items-center justify-between border border-zinc-200 hover:ring-1 hover:ring-zinc-300 px-4 py-4 sm:py-6 rounded-md cursor-pointer", {
                              "border-zinc-800 border-2": option.id === cart.shipping_methods[0]?.shipping_option_id
                           })}>
                              <div className="flex gap-2 items-center">
                                 <RadioGroupItem 
                                    checked={
                                       option.id ===
                                       cart.shipping_methods[0]?.shipping_option_id
                                    } 
                                    value={option.id as string} id={option.id} 
                                 />
                                 <Label htmlFor={option.id} className="cursor-pointer">{option.name}</Label>
                              </div>
                              <span>
                                 {formatAmount({
                                    amount: option.amount!,
                                    region: cart?.region,
                                    includeTaxes: false,
                                 })}
                              </span>
                           </div>
                        ))
                     ): (
                        <div className="flex flex-col items-center justify-center px-4 py-8 text-ui-fg-base">
                           <Loader2 className="w-5 h-5 animate-spin text-primary"/>
                        </div>
                     )}
                  </RadioGroup>
               </div>
               
               <p data-testid="delivery-option-error-message" className="text-sm font-medium text-red-500">
                  {error}
               </p>
               
               <Button
                  className="mt-6 flex items-center gap-2"
                  onClick={handleSubmit}
                  disabled={!cart.shipping_methods[0] || isLoading}
                  data-testid="submit-delivery-option-button"
               >
                  Continue to payment 
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin"/>}
               </Button>
            </div>
         ) : (
            <>
               {cart && cart.shipping_methods.length > 0 && (
                  <div>
                     <p className="font-medium mb-1">Method</p>
                     <p className="text-sm text-muted-foreground">
                        {cart.shipping_methods[0].shipping_option.name} (
                           {formatAmount({
                              amount: cart.shipping_methods[0].price,
                              region: cart.region,
                              includeTaxes: false,
                           })
                           .replace(/,/g, "")
                           .replace(/\./g, ",")}
                        )
                     </p>
                  </div>
               )}
            </>
         )}
         <Separator className="bg-zinc-100 mt-8"/>
      </>
   )
}

export default Delivery
