import { enrichLineItems } from "@/actions/cart-actions"
import CartItemWrapper from "@/components/wrappers/CartItemWrapper"
import CustomLink from "@/components/CustomLink"
import Summary from "@/components/Summary"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { getCart, getCustomer } from "@/data"
import { getCheckoutStep } from "@/lib/util/get-checkout-step"
import { CartWithCheckoutStep } from "@/types/global"
import { LineItem } from "@medusajs/medusa"
import { cookies } from "next/headers"

const fetchCart = async () => {
   const cartId = cookies().get("_medusa_cart_id")?.value
 
   if (!cartId) {
     return null
   }
 
   const cart = await getCart(cartId).then(
     (cart) => cart as CartWithCheckoutStep
   )
 
   if (!cart) {
     return null
   }
 
   if (cart?.items.length) {
     const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
     cart.items = enrichedItems as LineItem[]
   }
 
   cart.checkout_step = cart && getCheckoutStep(cart)
 
   return cart
}

const page = async () => {
   const cart = await fetchCart()
   const customer = await getCustomer()
   
   return (
      <section className="min-w-full py-16 min-h-[calc(100dvh-64px)]">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 max-w-2xl lg:max-w-full mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">Shopping Cart</h2>
            {!customer && 
               <Card className="col-span-1">
                  <CardHeader className="font-semibold lg:text-xl">Already have an account?</CardHeader>
                  <CardContent className="flex items-center gap-4 justify-between flex-wrap -mt-2">
                     <p>Sign in for a better shopping experience.</p>
                     <CustomLink href="/sign-in" className={buttonVariants({variant: "outline"})}>Sign in</CustomLink>
                  </CardContent>
               </Card>
            }
            
         </div>
         <div className="lg:flex justify-between items-start gap-12 max-w-2xl mx-auto lg:max-w-full">
            <div className="md:flex-1 grid divide-y-[1px] divide-zinc-100">
               {<CartItemWrapper region={cart?.region} items={cart?.items}/>}
            </div>
            {cart && cart.region && <Summary cart={cart}/>}
         </div>
      </section>
   )
}

export default page
