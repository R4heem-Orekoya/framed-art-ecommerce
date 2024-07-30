import { ArrowRight } from "lucide-react"
import CustomLink from "./CustomLink"
import { Separator } from "./ui/separator"
import { buttonVariants } from "./ui/button"
import { CartWithCheckoutStep } from "@/types/global"
import { formatAmount } from "@/lib/util/prices"
import CartTotals from "./CartTotals"

interface SummaryProps {
   cart: CartWithCheckoutStep
}

const Summary = ({ cart }: SummaryProps) => {
   return (
      <div className="md:min-w-[350px] max-md:mt-8 p-6 rounded-lg bg-zinc-50 border border-zinc-100">
         <h3 className="text-lg sm:text-xl font-semibold text-primary">Summary</h3>
         <Separator className="my-4 bg-zinc-100"/>
         <CartTotals cart={cart}/>
         <Separator className="my-4 bg-zinc-100"/>
         <CustomLink href="/checkout?step=address" className={buttonVariants({
            className: "w-full flex items-center gap-2 group"
         })}>
            Continue to checkout
            <ArrowRight className="w-4 h-4 flex-shrink-0 -rotate-45 group-hover:rotate-0 duration-300"/>
         </CustomLink>
      </div>
   )
}

export default Summary
