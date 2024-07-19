"use client"

import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddressFieldsValidator, TAddressFieldsValidator } from "@/lib/validators/address-fields"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { addCustomerShippingAddress } from "@/actions/account-actions"
import { Plus } from "lucide-react"
import { useState } from "react"

const AddressDialog = () => {
   const [isOpen, setIsOpen] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<TAddressFieldsValidator>({
      resolver: zodResolver(AddressFieldsValidator)
   })
   
   const onSubmit = async (data: TAddressFieldsValidator) => {      
      try {
         const res = await addCustomerShippingAddress(data)
         
         if(res.success) {
            reset()
            setIsOpen(false)
            toast.success("Address added successfully")
         }
         
         if(!res.success) {
            toast.error(res.error)
         }
      } catch (error) {
         console.log(error);
         toast.error("Something went wrong, please try again!")
      }
   }
   
   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <div className="min-h-[220px] border border-zinc-200 rounded-md flex flex-col justify-between p-4 cursor-pointer">
               <h3 className="text-sm font-semibold text-zinc-800">New address</h3>
               <Plus className="text-zinc-800"/>
            </div>
         </DialogTrigger>
         <DialogContent aria-describedby="Address-form-dialog" className="max-w-md">
            <DialogHeader>
               <DialogTitle className="text-zinc-800 font-semibold text-xl -mt-2">
                  Add Address
               </DialogTitle>
            </DialogHeader>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-4 grid gap-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                           <Input 
                              placeholder="First Name" 
                              {...register("firstName")}
                              className={cn({"border-red-500 focus-visible:ring-red-500": errors.firstName})}
                           />
                           {errors.firstName && <p className="text-xs font-medium text-red-500">{errors.firstName.message}</p>}
                        </div>
                        <div className="grid gap-2">
                           <Input 
                              placeholder="Last Name" 
                              {...register("lastName")}
                              className={cn({"border-red-500 focus-visible:ring-red-500": errors.lastName})}
                           />
                           {errors.lastName && <p className="text-xs font-medium text-red-500">{errors.lastName.message}</p>}
                        </div>
                     </div>
                     
                     {/* <div className="grid gap-2">
                        <Input 
                           placeholder="Company" 
                           {...register("company")}
                           className={cn({"border-red-500 focus-visible:ring-red-500": errors.company})}
                        />
                        {errors.company && <p className="text-xs font-medium text-red-500">{errors.company.message}</p>}
                     </div> */}
                     
                     <div className="grid gap-2">
                        <Input 
                           placeholder="Address" 
                           {...register("address")}
                           className={cn({"border-red-500 focus-visible:ring-red-500": errors.address})}
                        />
                        {errors.address && <p className="text-xs font-medium text-red-500">{errors.address.message}</p>}
                     </div>
                     
                     {/* <div className="grid gap-2">
                        <Input 
                           placeholder="Apartment, suite, e.t.c"
                           {...register("apartment")}
                           className={cn({"border-red-500 focus-visible:ring-red-500": errors.apartment})}
                        />
                        {errors.apartment && <p className="text-xs font-medium text-red-500">{errors.apartment.message}</p>}
                     </div> */}
                     
                     <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                        <div className="grid gap-2 sm:col-span-2">
                           <Input 
                              type="number" 
                              className={cn({"border-red-500 focus-visible:ring-red-500": errors.postalCode})}
                              placeholder="Postal code" 
                              {...register("postalCode")}
                           />
                           {errors.postalCode && <p className="text-xs font-medium text-red-500">{errors.postalCode.message}</p>}
                        </div>
                        <div className="grid gap-2 sm:col-span-3">
                           <Input 
                              className={cn({"border-red-500 focus-visible:ring-red-500": errors.postalCode})}
                              placeholder="City" 
                              {...register("city")} 
                           />
                           {errors.city && <p className="text-xs font-medium text-red-500">{errors.city.message}</p>}
                        </div>
                     </div>
                     
                     <div className="grid gap-2">
                        <Input 
                           placeholder="Province/State" 
                           {...register("state")}
                           className={cn({"border-red-500 focus-visible:ring-red-500": errors.state})}
                        />
                        {errors.state && <p className="text-xs font-medium text-red-500">{errors.state.message}</p>}
                     </div>
                     
                     <select
                        {...register('country')} 
                        className="h-10 px-2 rounded-md border border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="us">United States</option>
                        <option value="ng">Nigeria</option>
                     </select>
                     
                     <div className="grid gap-2">
                        <Input 
                           type="number" 
                           placeholder="Phone" 
                           {...register("phone")}
                           className={cn({"border-red-500 focus-visible:ring-red-500": errors.phone})}
                        /> 
                        {errors.phone && <p className="text-xs font-medium text-red-500">{errors.phone.message}</p>}
                     </div>
                     <Button className="mt-2 w-fit ml-auto">
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin"/>}
                        Save
                     </Button>
                  </div>
               </form>
         </DialogContent>
      </Dialog>
   )
}

export default AddressDialog
