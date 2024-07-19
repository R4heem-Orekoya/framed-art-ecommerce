"use client"

import { updateCustomerPassword } from "@/actions/account-actions"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import AccountInfo from "./AccountInfo"
import { Customer } from "@medusajs/medusa"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const ProfilePassword = ({ customer }: { customer: Omit<Customer, "password_hash"> }) => {
   const [successState, setSuccessState] = useState(false)
   const [state, formAction] = useFormState(updateCustomerPassword, {
      customer,
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
      <form action={formAction} className="">
         <AccountInfo
            label="Password"
            currentInfo={
               <span>The password is not shown for security reasons</span>
            }
            isSuccess={successState}
            isError={!!state.error}
            errorMessage={state.error}
            clearState={clearState}
            data-testid="account-password-editor"
         >
            <div className="grid grid-cols-2 gap-4">
               <div className="grid gap-2">
                  <Label>Old Password</Label>
                  <Input
                     name="old_password"
                     required
                     type="password"
                     data-testid="old-password-input"
                  />
               </div>
               <div className="grid gap-2">
                  <Label>New Password</Label>
                  <Input
                     name="new_password"
                     required
                     type="password"
                     data-testid="new-password-input"
                  />   
               </div>
               <div className="grid gap-2">
                  <Label>Confirm Password</Label>
                  <Input
                     name="confirm_password"
                     required
                     type="password"
                     data-testid="confirm-password-input"
                  />   
               </div>
            </div>
         </AccountInfo>
      </form>
   )
}

export default ProfilePassword