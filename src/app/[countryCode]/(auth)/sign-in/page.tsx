import LoginComponent from "@/components/LoginComponent"
import { getCustomer } from "@/data"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
   title: "Sign in",
   description: "Sign in to your Store account.",
}

const page = async () => {
   const customer = await getCustomer()
   
   if(customer) redirect("/account")
   
   return (
      <LoginComponent />
   )
}

export default page
