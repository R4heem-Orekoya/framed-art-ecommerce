import { enrichLineItems } from "@/actions/cart-actions"
import CartTotals from "@/components/CartTotals"
import Help from "@/components/Help"
import ItemsPreview from "@/components/ItemsPreview"
import OrderDetails from "@/components/OrderDetails"
import PaymentDetails from "@/components/PaymentDetails"
import ShippingDetails from "@/components/ShippingDetails"
import { Separator } from "@/components/ui/separator"
import { retrieveOrder } from "@/data"
import { LineItem, Order } from "@medusajs/medusa"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface Props {
   params: { id: string }
}

async function getOrder(id: string) {
   const order = await retrieveOrder(id)
 
   if (!order) {
      return notFound()
   }
 
   const enrichedItems = await enrichLineItems(order.items, order.region_id)
 
   return {
      order: {
         ...order,
         items: enrichedItems as LineItem[],
      } as Order,
   }
}

export const metadata: Metadata = {
   title: "Order Confirmed",
   description: "You purchase was successful",
}

const page = async ({ params }: Props) => {
   const { order } = await getOrder(params.id)
   
   return (
      <div className="min-h-[calc(100dvh-64px)] max-w-3xl mx-auto py-16">
         <div>
            <p className="font-medium text-lg text-muted-foreground pb-1">Thank you!</p>
            <h2 className="text-xl md:text-2xl font-semibold pb-2">Your order was placed successfully.</h2>
            <OrderDetails order={order}/>
            <h3 className="text-xl md:text-2xl lg:text-3xl mt-8 font-semibold">Summary</h3>
            <Separator className="my-6 bg-zinc-100"/>
            <ItemsPreview items={order.items} region={order.region}/>
            <Separator className="my-6 bg-zinc-100"/>
            <CartTotals data={order} />
            <Separator className="my-4 bg-zinc-100"/>
            <ShippingDetails order={order}/>
            <PaymentDetails order={order}/>
            <Help />
         </div>
      </div>
   )
}

export default page
