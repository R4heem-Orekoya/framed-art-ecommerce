import { Order } from "@medusajs/medusa"

interface OrderDetailsProps {
   order: Order
   showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
   const formatStatus = (str: string) => {
      const formatted = str.split("_").join(" ")
  
      return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
   }
   
   return (
      <>
         <p className="sm:text-lg pt-4">
            We have sent the order confirmation details to{" "}
            <span className="font-semibold" data-testid="order-email">
               {order.email}.
            </span>
         </p>
         
         <p className="sm:text-lg py-2">
            Order date: 
            <span data-testid="order-date">
               {new Date(order.created_at).toDateString()}
            </span>
         </p>
         <p className="sm:text-lg text-zinc-900">
            Order number: 
            <span data-testid="order-id">
               {order.display_id}
            </span>
         </p>
         
         <div className="flex items-center text-compact-small gap-x-4 mt-4">
            {showStatus && (
               <>
                  <p>
                     Order status:{" "}
                     <span className="text-ui-fg-subtle " data-testid="order-status">
                        {formatStatus(order.fulfillment_status)}
                     </span>
                  </p>
                  <p>
                     Payment status:{" "}
                     <span className="text-ui-fg-subtle " sata-testid="order-payment-status">
                        {formatStatus(order.payment_status)}
                     </span>
                  </p>
               </>
            )}
         </div>
      </>
   )
}

export default OrderDetails
