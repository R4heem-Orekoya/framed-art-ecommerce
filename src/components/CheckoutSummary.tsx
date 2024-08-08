import { cookies } from "next/headers"
import { Separator } from "./ui/separator"
import { getCart } from "@/data"
import CartTotals from "./CartTotals"
import DiscountCode from "./DiscountCode"
import ItemsPreview from "./ItemsPreview"

const CheckoutSummary = async () => {
   const cartId = cookies().get("_medusa_cart_id")?.value

   if (!cartId) {
     return null
   }
 
   const cart = await getCart(cartId).then((cart) => cart)
 
   if (!cart) {
     return null
   }
   
   return (
      <div className="col-span-1 md:col-span-2 py-12 md:pl-6 md:h-full md:sticky md:top-16">
         <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-zinc-800">
            In your Cart
         </h2>
         <Separator className="my-4 opacity-50"/>
         <CartTotals data={cart}/>
         <Separator className="my-4 opacity-50"/>
         <ItemsPreview items={cart.items} region={cart.region} />
         <Separator className="my-4 opacity-50"/>
         <DiscountCode cart={cart}/>
      </div>
   )
}

export default CheckoutSummary
