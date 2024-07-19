"use client"

import { Edit } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Address } from "@medusajs/medusa"
import { useEffect, useState } from "react"
import { updateCustomerShippingAddress } from "@/actions/account-actions"
import { useFormState } from "react-dom"
import { toast } from "sonner"

const EditAddressDialog = ({ address }: { address: Address}) => {
   const [isOpen, setIsOpen] = useState(false)
   
   const [formState, formAction] = useFormState(updateCustomerShippingAddress, {
      success: false,
      error: null,
      addressId: address.id,
   })
  
   useEffect(() => {
      if (formState.success) {
         setIsOpen(false)
         toast.success("Address edited successfully!")
      }
      if (formState.error) {
         toast.error(formState.error)
      }
   }, [formState])
   
   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button
               variant="ghost"
               className="text-sm flex items-center gap-x-2"
               data-testid="address-edit-button"
               >
               <Edit className="text-zinc-800 w-4 h-4"/>
               Edit
            </Button>
         </DialogTrigger>
         
         <DialogContent aria-describedby="Edit-address-form-dialog" className="max-w-md">
            <DialogHeader>
               <DialogTitle className="text-zinc-800 font-semibold text-xl -mt-2">
                  Edit Address
               </DialogTitle>
            </DialogHeader>
            
            <form action={formAction}>
               <div className="flex flex-col gap-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                     <Input
                        placeholder="First Name"
                        name="first_name"
                        required
                        autoComplete="given-name"
                        defaultValue={address.first_name || undefined}
                        data-testid="first-name-input"
                     />
                     <Input
                        placeholder="Last Name"
                        name="last_name"
                        required
                        autoComplete="last-name"
                        defaultValue={address.last_name || undefined}
                        data-testid="last-name-input"
                     />
                  </div>
                  
                  <Input 
                     placeholder="Address" 
                     name="address_1"
                     required
                     autoComplete="address-line1"
                     defaultValue={address.address_1 || undefined}
                     data-testid="address-1-input"
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                     <Input
                        className="col-span-2"
                        placeholder="Postal Code"
                        name="postal_code"
                        required
                        autoComplete="postal-code"
                        defaultValue={address.postal_code || undefined}
                        data-testid="postal-code-input"
                     />
                     
                     <Input 
                        className="col-span-3"
                        placeholder="City" 
                        name="city"
                        required
                        autoComplete="locality"
                        defaultValue={address.city || undefined}
                        data-testid="city-input"
                     /> 
                  </div>
                  
                  <Input 
                     placeholder="Province/State" 
                     name="province"
                     autoComplete="address-level1"
                     defaultValue={address.province || undefined}
                     data-testid="state-input"
                  />
                  
                  <select
                     name="country_code"
                     required
                     autoComplete="country"
                     defaultValue={address.country_code || undefined}
                     data-testid="country-select"
                     className="h-10 px-2 rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                     <option value="us">United States</option>
                     <option value="ng">Nigeria</option>
                  </select>
                  
                  <Input 
                     type="number" 
                     placeholder="Phone"
                     name="phone"
                     autoComplete="phone"
                     defaultValue={address.phone || undefined}
                     data-testid="phone-input" 
                  /> 
                  
                  <Button className="self-end">Save</Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   )
}

export default EditAddressDialog
