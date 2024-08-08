import { Order } from "@medusajs/medusa"
import { Separator } from "./ui/separator"
import { formatAmount } from "@/lib/util/prices"


interface ShippingDetailsProps {
  order: Order
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
   return (
      <div>
         <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold my-8">
          Delivery
         </h4>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div data-testid="shipping-address-summary">
               <p className="font-medium mb-2">
                  Shipping Address
               </p>
               <p className="text-muted-foreground text-sm">
                  {order.shipping_address.first_name}{" "}
                  {order.shipping_address.last_name}
               </p>
               <p className="text-muted-foreground text-sm">
                  {order.shipping_address.address_1}{" "}
                  {order.shipping_address.address_2}
               </p>
               <p className="text-muted-foreground text-sm">
                  {order.shipping_address.postal_code}, {order.shipping_address.city}
               </p>
               <p className="text-muted-foreground text-sm">
                  {order.shipping_address.country_code?.toUpperCase()}
               </p>
            </div>

            <div data-testid="shipping-contact-summary">
               <p className="font-medium mb-2">Contact</p>
               <p className="text-sm text-muted-foreground">
                  {order.shipping_address.phone}
               </p>
               <p className="text-sm text-muted-foreground">{order.email}</p>
            </div>

            <div data-testid="shipping-method-summary">
               <p className="font-medium mb-2">Method</p>
               <p className="text-sm text-muted-foreground">
                  {order.shipping_methods[0].shipping_option?.name}{" "}
                  ({formatAmount({ amount: order.shipping_methods[0].price, region: order.region, includeTaxes: false }).replace(/,/g, "").replace(/\./g, ",")})
               </p>
            </div>
         </div>
         <Separator className="bg-zinc-100 mt-8" />
      </div>
   )
}

export default ShippingDetails
