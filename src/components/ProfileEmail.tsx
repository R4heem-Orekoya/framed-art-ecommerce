"use client"

import { updateCustomerEmail } from "@/actions/account-actions"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import AccountInfo from "./AccountInfo"
import { Customer } from "@medusajs/medusa"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const ProfileEmail = ({ customer }: { customer: Omit<Customer, "password_hash"> }) => {
   const [successState, setSuccessState] = useState(false)
   const [state, formAction] = useFormState(updateCustomerEmail, {
      error: false,
      success: false,
   })
   
   const clearState = () => {
      setSuccessState(false)
   }
   
   useEffect(() => {
      setSuccessState(state.success)
   }, [state])
   
   return (
      <form action={formAction}>
         <AccountInfo
            label="Email"
            currentInfo={`${customer.email}`}
            isSuccess={successState}
            isError={!!state.error}
            errorMessage={state.error}
            clearState={clearState}
            data-testid="account-email-editor"
         >
            <div>
               <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input
                     name="email"
                     required
                     defaultValue={customer.email}
                     data-testid="email-input"
                  />
               </div>
            </div>
         </AccountInfo>
      </form>
   )
}

export default ProfileEmail