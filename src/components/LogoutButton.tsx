"use client"

import { signOut } from "@/actions/account-actions"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { redirect } from "next/navigation"

const LogoutButton = ({ countryCode }: { countryCode: string }) => {
   return (
      <Button
         onClick={async () => {
            await signOut(countryCode)
            redirect("sign-in")
         }}
         className="group">
         Logout
      <ArrowRight className='w-4 h-4 ml-1 -rotate-45 group-hover:rotate-0 transition z-10'/>
    </Button>
   )
}

export default LogoutButton
