"use client"

import { updateCustomerName } from "@/actions/account-actions"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import AccountInfo from "./AccountInfo"
import { Customer } from "@medusajs/medusa"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const ProfileName = ({ customer }: { customer: Omit<Customer, "password_hash"> }) => {
   const [successState, setSuccessState] = useState(false)
   const [state, formAction] = useFormState(updateCustomerName, {
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
            label="Name"
            currentInfo={`${customer.first_name} ${customer.last_name}`}
            isSuccess={successState}
            isError={!!state?.error}
            clearState={clearState}
            data-testid="account-name-editor"
         >
            <div className="grid grid-cols-2 gap-x-4">
               <div className="grid gap-2">
                  <Label>First Name</Label>
                  <Input
                     name="first_name"
                     required
                     defaultValue={customer.first_name}
                     data-testid="first-name-input"
                  />
               </div>
               <div className="grid gap-2">
                  <Label>Last Name</Label>
                  <Input
                     name="last_name"
                     required
                     defaultValue={customer.last_name}
                     data-testid="last-name-input"
                  />   
               </div>
            </div>
         </AccountInfo>
      </form>
   )
}

export default ProfileName