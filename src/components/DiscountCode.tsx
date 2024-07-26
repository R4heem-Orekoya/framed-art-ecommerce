"use client"

import { Cart } from "@medusajs/medusa"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { formatAmount } from "@/lib/util/prices"
import { useMemo } from "react"
import { removeDiscount, removeGiftCard } from "@/actions/checkout-actions"

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
   
   const removeGiftCardCode = async (code: string) => {
      await removeGiftCard(code, gift_cards)
   }
  
   const removeDiscountCode = async () => {
      await removeDiscount(discounts[0].code)
   }
    
   return (
      <div className="flex gap-2 mt-4">
         <Input className="placeholder:text-xs" placeholder="Discount code (you can ignore if you don't have one)"/>
         <Button className="text-sm">Apply</Button>
      </div>
   )
}

export default DiscountCode
