import { enrichLineItems } from "@/actions/cart-actions"
import CheckoutForm from "@/components/CheckoutForm"
import CheckoutSummary from "@/components/CheckoutSummary"
import { getCart } from "@/data"
import { LineItem } from "@medusajs/medusa"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
   title: "Checkout",
}

const fetchCart = async () => {
   const cartId = cookies().get("_medusa_cart_id")?.value
 
   if (!cartId) {
     return notFound()
   }
 
   const cart = await getCart(cartId).then((cart) => cart)
 
   if (cart?.items.length) {
     const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
     cart.items = enrichedItems as LineItem[]
   }
 
   return cart
}
 
const page = async () => {
   const cart = await fetchCart()

   if (!cart) {
     return notFound()
   }
   
   return (
      <div className="w-[min(1400px,90%)] mx-auto min-h-[calc(100dvh-64px)] grid grid-cols-1 md:grid-cols-5 md:divide-x md:divide-zinc-100">
         <CheckoutForm />
         <CheckoutSummary />
      </div>
   )
}

export default page
