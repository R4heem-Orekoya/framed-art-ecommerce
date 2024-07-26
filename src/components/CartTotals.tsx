import { formatAmount } from "@/lib/util/prices"
import { Separator } from "./ui/separator"
import { Cart, Order } from "@medusajs/medusa"

const CartTotals = ({ cart } : { cart: Omit<Cart, "refundable_amount" | "refunded_total"> | Order }) => {
   const getAmount = (amount: number | null | undefined) => {
      return formatAmount({
        amount: amount || 0,
        region: cart.region,
        includeTaxes: false,
      })
   }
   
   return (
      <>
         <div className="grid gap-2">
            <div className="flex justify-between items-center">
               <span className="text-sm text-zinc-700">Subtotal</span>
               <span className="text-sm font-medium text-primary">{getAmount(cart.subtotal)}</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-zinc-700">Shipping</span>
               <span className="text-sm font-medium text-primary">{getAmount(cart.shipping_total)}</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-sm text-zinc-700">Taxes</span>
               <span className="text-sm font-medium text-primary">{getAmount(cart.tax_total)}</span>
            </div>
         </div>
         <Separator className="my-4 bg-zinc-100"/>
         <div className="flex justify-between items-center">
            <span className="text-sm text-zinc-700">Total</span>
            <span className="text-lg font-medium text-primary">{getAmount(cart.total)}</span>
         </div>
      </>
   )
}

export default CartTotals
