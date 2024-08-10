import { Customer, Order } from "@medusajs/medusa"
import CustomLink from "./CustomLink"
import { buttonVariants } from "./ui/button"
import Image from "next/image"
import { listCustomerOrders } from "@/data"
import { formatAmount } from "@/lib/util/prices"
import { ScrollArea } from "./ui/scroll-area"
import { isEmpty } from "lodash"

const OrdersTab = async () => {
   const orders = await listCustomerOrders() as Order[]
   return (
      <div>
         <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-700">Orders</h3>
         <p className="text-sm mt-4 text-muted-foreground max-w-xl">View your previous orders and their status</p>
         <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            {orders && orders.map((order) => (
               <li key={order.id} className="border border-zinc-100 rounded-md shadow-sm">
                  <div className="flex flex-wrap gap-4 items-start justify-between p-4 border-b border-zinc-100">
                     <div className="flex gap-6 flex-1 min-w-[150px]">
                        <div>
                           <p className="text-sm font-medium">Order number</p>
                           <p className="text-xs text-muted-foreground">{order.display_id}</p>
                        </div>
                        <div className="max-sm:hidden">
                           <p className="text-sm font-medium">Date placed</p>
                           <p className="text-xs text-muted-foreground">{new Date(order.created_at).toDateString()}</p>
                        </div>
                        <div>
                           <p className="text-sm font-medium">Amount</p>
                           <p className="text-xs text-muted-foreground">
                              {formatAmount({
                                 amount: order.total,
                                 region: order.region,
                                 includeTaxes: false,
                              })}
                           </p>
                        </div>
                     </div>
                     <CustomLink className={buttonVariants({ variant: "outline", size: "sm" })} href={`/account/orders/details/${order.id}`}>View order</CustomLink>
                  </div>
                  
                  <ScrollArea>
                     <ul className="grid gap-3 max-h-32 p-4">
                        {order.items.map((item) => (
                           <li key={item.id} className="flex items-start gap-4">
                              <div className="relative size-20 rounded-md border border-zinc-100">
                                 <Image src={item.thumbnail as string} alt={item.title} fill className="object-cover"/>
                              </div>
                              <div className="grid gap-1 sm:py-2 flex-1">
                                 <div className="flex justify-between items-center">
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-muted-foreground font-medium">
                                       <span>{item.quantity}</span>
                                       <span>×</span>
                                       <span>
                                          {formatAmount({
                                             amount: item.unit_price,
                                             region: order.region,
                                             includeTaxes: false
                                          })}
                                       </span>
                                    </p>
                                 </div>
                                 <p className="text-xs">{item.description}</p>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </ScrollArea>
               </li>
            ))}
         </ul>
      </div>
   )
}

export default OrdersTab
