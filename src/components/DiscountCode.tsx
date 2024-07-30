"use client"

import { Cart } from "@medusajs/medusa"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { formatAmount } from "@/lib/util/prices"
import { useMemo, useState } from "react"
import { removeDiscount, removeGiftCard, submitDiscountForm } from "@/actions/checkout-actions"
import { Loader2, Trash, Trash2 } from "lucide-react"
import { useFormState, useFormStatus } from "react-dom"
import ApplyDiscountButton from "./ApplyDiscountButton"

const DiscountCode = ({ cart }: { cart : Omit<Cart, "refundable_amount" | "refunded_total">}) => {
   const { discounts, gift_cards, region } = cart
   
   const appliedDiscount = useMemo(() => {
      if (!discounts || !discounts.length) {
        return undefined
      }
  
      switch (discounts[0].rule.type) {
         case "percentage":
            return `${discounts[0].rule.value}%`
         case "fixed":
            return `- ${formatAmount({
               amount: discounts[0].rule.value,
               region: region,
            })}`
  
         default:
            return "Free shipping"
      }
   }, [discounts, region])
   
   const [isDiscountCodeRemoving, setIsDiscountCodeRemoving] = useState(false)
   
   const removeGiftCardCode = async (code: string) => {
      await removeGiftCard(code, gift_cards)
   }
  
   const removeDiscountCode = async () => {
      setIsDiscountCodeRemoving(true)
      await removeDiscount(discounts[0].code)
      setIsDiscountCodeRemoving(false)
   }
   
   const [message, formAction] = useFormState(submitDiscountForm, null)
    
   return (
      <div>
         {appliedDiscount ? (
            <div className="w-full flex items-center">
               <div className="flex flex-col w-full">
                  <h4 className="txt-medium">Discount applied:</h4>
                  <div className="flex items-center justify-between mt-2" data-testid="discount-row">
                     <p className="text-sm font-medium">
                        <span>Code:</span>
                        <span className="truncate ml-2" data-testid="discount-code">
                           {discounts[0].code}
                        </span>
                        <span
                           className="ml-2"
                           data-testid="discount-amount"
                           data-value={discounts[0].rule.value}
                        >
                           ({appliedDiscount})
                        </span>
                     </p>
                     <button
                        className="flex items-center"
                        onClick={removeDiscountCode}
                        data-testid="remove-discount-button"
                     >
                        {isDiscountCodeRemoving ? 
                           <Loader2 className="w-4 h-4 animate-spin text-red-500"/> :
                           <Trash2 className="w-5 h-5 text-red-500" />
                        }
                        <span className="sr-only">
                           Remove discount code from order
                        </span>
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            <>
               <form action={formAction} className="flex gap-2">
                  <Input 
                     type="text" name="code" 
                     className="placeholder:text-xs text-sm" 
                     placeholder="Discount code (you can ignore if you don't have one)"
                  />
                  <ApplyDiscountButton error={message}/>
               </form>
               {message && <p className="text-xs mt-2 text-red-500 font-medium">{message}</p>}
            </>
         )}
      </div>
   )
}

export default DiscountCode
