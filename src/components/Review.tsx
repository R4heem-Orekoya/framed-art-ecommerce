"use client"


import { useSearchParams } from "next/navigation"
import { Cart } from "@medusajs/medusa"
import { cn } from "@/lib/utils"
import CustomLink from "./CustomLink"
import { buttonVariants } from "./ui/button"
import PaymentButton from "./PaymentButton"

const Review = ({ cart }: { cart: Omit<Cart, "refundable_amount" | "refunded_total"> }) => {
   const searchParams = useSearchParams()

   const isOpen = searchParams.get("step") === "review"

   const paidByGiftcard = cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

   const previousStepsCompleted = cart.shipping_address && cart.shipping_methods.length > 0 && (cart.payment_session || paidByGiftcard)

   return (
      <>
         <div className="flex flex-row items-center justify-between mb-6">
            <h2 className={cn("flex items-center gap-2 text-xl md:text-2xl lg:text-3xl font-semibold text-zinc-800", {
               "opacity-50 pointer-events-none select-none": !isOpen
            })}>
               Review
            </h2>
         </div>
         {isOpen && previousStepsCompleted && (
         <>
            <p className="txt-medium-plus text-ui-fg-base mb-1">
               Placing this order indicates your agreement to our
               <span><CustomLink className="underline" href="/shipping-policy"> shipping</CustomLink></span> and 
               <span><CustomLink className="underline" href="/shipping-policy"> return</CustomLink></span> Policies. 
               Please review them before proceeding.
            </p>
            <div className="mt-6">
               <PaymentButton cart={cart} data-testid="submit-order-button" /> 
            </div>
         </>
         )}
      </>
   )
}

export default Review
