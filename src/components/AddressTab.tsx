import AddressDialog from "./AddressDialog"
import { Customer } from "@medusajs/medusa"
import { headers } from "next/headers"
import { getRegion } from "@/data"
import { notFound } from "next/navigation"
import EditAddress from "./EditAddress"

const AddressTab = async ({ customer }: { customer: Omit<Customer, "password_hash">}) => {
   const nextHeaders = headers()
   const countryCode = nextHeaders.get("next-url")?.split("/")[1] || ""
   const region = await getRegion(countryCode)
   
   if (!customer || !region) {
      notFound()
   }
   
   return (
      <>
         <div className="mt-8 max-w-2xl">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-zinc-700">Shipping Addresses</h3>
            <p className="text-sm mt-4 text-muted-foreground">
               View and update your shipping addresses, you can add as many as you like. Saving 
               your addresses will make them available during checkout.
            </p>
         </div>
         
         <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            <AddressDialog />
            {customer.shipping_addresses.map((address) => {
               return (
                  <EditAddress region={region} address={address} key={address.id} />
               )
            })}
         </div>
      </>
   )
}

export default AddressTab
