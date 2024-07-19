"use client"

import { updateCustomerPhone } from "@/actions/account-actions"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import AccountInfo from "./AccountInfo"
import { Customer } from "@medusajs/medusa"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const ProfilePhone = ({ customer }: { customer: Omit<Customer, "password_hash"> }) => {
   const [successState, setSuccessState] = useState(false)
   const [state, formAction] = useFormState(updateCustomerPhone, {
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
            label="Phone"
            currentInfo={`${customer.phone}`}
            isSuccess={successState}
            isError={!!state.error}
            errorMessage={state.error}
            clearState={clearState}
            data-testid="account-phone-editor"
         >
            <div>
               <div className="grid gap-2">
                  <Label>Phone number</Label>
                  <Input
                     name="phone"
                     type="tel"
                     required
                     defaultValue={customer.phone}
                     data-testid="email-input"
                  />
               </div>
            </div>
         </AccountInfo>
      </form>
   )
}

export default ProfilePhone