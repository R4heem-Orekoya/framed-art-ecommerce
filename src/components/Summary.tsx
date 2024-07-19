import { ArrowRight } from "lucide-react"
import CustomLink from "./CustomLink"
import { Separator } from "./ui/separator"
import { buttonVariants } from "./ui/button"
import { CartWithCheckoutStep } from "@/types/global"
import { formatAmount } from "@/lib/util/prices"

interface SummaryProps {
   cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
   
   const getAmount = (amount: number | null | undefined) => {
      return formatAmount({
        amount: amount || 0,
        region: cart.region,
        includeTaxes: false,
      })
   }
   
   return (
      <div className="md:min-w-[350px] max-md:mt-8 p-6 rounded-lg bg-zinc-50 border border-zinc-100">
         <h3 className="text-lg sm:text-xl font-semibold text-primary">Summary</h3>
         <Separator className="my-4 bg-zinc-100"/>
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
         <Separator className="my-4 bg-zinc-100"/>
         <CustomLink href="/checkout" className={buttonVariants({
            className: "w-full flex items-center gap-2 group"
         })}>
            Continue to checkout
            <ArrowRight className="w-4 h-4 flex-shrink-0 -rotate-45 group-hover:rotate-0 duration-300"/>
         </CustomLink>
      </div>
   )
}

export default Summary
