import CustomLink from "@/components/CustomLink"
import Help from "@/components/Help"
import ItemsPreview from "@/components/ItemsPreview"
import PaymentDetails from "@/components/PaymentDetails"
import ShippingDetails from "@/components/ShippingDetails"
import { Separator } from "@/components/ui/separator"
import { retrieveOrder } from "@/data"
import { ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import { notFound } from "next/navigation"

interface Props {
   params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const order = await retrieveOrder(params.id).catch(() => null)
 
   if (!order) {
     notFound()
   }
 
   return {
     title: `Order #${order.display_id}`,
     description: `View your order`,
   }
}

const page = async ({ params }: Props) => {
   const order = await retrieveOrder(params.id).catch(() => null)
   
   if (!order) {
      notFound()
   }
   
   const formatStatus = (str: string) => {
      const formatted = str.split("_").join(" ")
  
      return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
   }
   
   return (
      <div className="min-h-[calc(100dvh-64px)] py-16 max-w-3xl mx-auto">
         <div className="flex flex-wrap gap-4 justify-between items-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Order details</h2>
            <CustomLink className="flex items-center gap-1 text-muted-foreground max-sm:text-xs font-medium hover:text-primary group" href="/account">
               <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:-translate-x-1 duration-300" strokeWidth={1.6}/>
               back to overview
            </CustomLink>
         </div>
         <p className="mt-4 text-muted-foreground">
            We have sent the order confirmation details to{" "}
            <span className="font-medium text-zinc-600">{order.customer.email}</span>.
         </p>
         <p className="mt-2 text-muted-foreground">
            Order date: <span className="text-zinc-600 font-medium" data-testid="order-date">{new Date(order.created_at).toDateString()}</span>
         </p>
         <p className="mt-2 text-muted-foreground">
            Order number: <span className="text-zinc-600 font-medium" data-testid="order-id">{order.display_id}</span>
         </p>
         
         <div className="flex gap-4 items-center mt-4">
            <p className="text-muted-foreground">
               Order status:{" "}
               <span className="text-zinc-600 font-medium" data-testid="order-status">
                  {formatStatus(order.fulfillment_status)}
               </span>
            </p>
            <p className="text-muted-foreground">
               Payment status:{" "}
               <span className="text-zinc-600 font-medium" sata-testid="order-payment-status">
                  {formatStatus(order.payment_status)}
               </span>
            </p>
         </div>
         <div className="mt-12">
            <Separator className="my-4 bg-zinc-100"/>
            <ItemsPreview items={order.items}  region={order.region} />
            <Separator className="my-4 bg-zinc-100"/>    
         </div>
         <ShippingDetails order={order}/>
         <PaymentDetails order={order}/>
         <Help />
      </div>
   )
}

export default page
