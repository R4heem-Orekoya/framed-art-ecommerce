import { Metadata } from "next"
import SignUpComponent from "@/components/SignUpComponent"
import { getCustomer } from "@/data"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
   title: "Sign Up",
   description: "Create a store account.",
}

const page = async () => {
   const customer = await getCustomer()
   
   if(customer) redirect("/account")
   
   return (
      <SignUpComponent />
   )
}

export default page
