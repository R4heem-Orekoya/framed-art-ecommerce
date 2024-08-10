import AddressTab from "@/components/AddressTab"
import LogoutButton from "@/components/LogoutButton"
import OrdersTab from "@/components/OrdersTab"
import ProfileTab from "@/components/ProfileTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCustomer, listRegions } from "@/data"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your Medusa Store profile."
}

const page = async ({ params: { countryCode } } : {params: { countryCode: string }}) => {
  const customer = await getCustomer()
  const regions = await listRegions()
  
  if(!customer || !regions) redirect("sign-in")
  
  return (
    <section className='py-16 min-h-[calc(100vh-64px)]'>
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold'>Your Account</h2>
          <p className="mt-2 text-muted-foreground text-sm">
            Currently signed in as:  
            <span className="font-semibold text-zinc-800">{" " + customer.email}</span>
          </p>
        </div>
        <LogoutButton countryCode={countryCode}/>
      </div>
      
      <Tabs defaultValue="profile" className="mt-8">
         <div className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
         </div>
         
         <TabsContent value="profile" className="mt-8">
            <ProfileTab customer={customer}/>
         </TabsContent>
         <TabsContent value="addresses">
            <AddressTab customer={customer}/>
         </TabsContent>
         <TabsContent value="orders" className="mt-8">
            <OrdersTab />
         </TabsContent>
      </Tabs>
    </section>
  )
}

export default page
