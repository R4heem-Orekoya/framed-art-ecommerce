"use client"

import { signOut } from "@/actions/account-actions"
import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const LogoutButton = ({ countryCode }: { countryCode: string }) => {
   const router = useRouter()
   return (
      <Button
         onClick={async () => {
            try {
               await signOut(countryCode)
               router.push(`/${countryCode}/sign-in`)
               toast.success("Signed out successfully!")
            } catch (error) {
               toast.error("Something went wrong! Try again.")
            }
         }}
         className="group">
         Logout
      <ArrowRight className='w-4 h-4 ml-1 -rotate-45 group-hover:rotate-0 transition z-10'/>
    </Button>
   )
}

export default LogoutButton
