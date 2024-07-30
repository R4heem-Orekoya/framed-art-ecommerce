"use client"

import { Address, AddressPayload, Cart } from "@medusajs/medusa"
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useMemo, useState } from "react"
import { Button } from "./ui/button"
import { CheckIcon, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import compareAddresses from "@/lib/util/compare-addresses"
import { cartUpdate } from "@/actions/checkout-actions"
import { omit } from "lodash"

interface AddressSelectProps {
   addresses: Address[]
   cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
}

const AddressSelect = ({ addresses, cart }: AddressSelectProps) => {
   const [open, setOpen] = useState(false)
   
   const selectedAddress = useMemo(() => {
      return addresses.find((a) => compareAddresses(a, cart?.shipping_address))
   }, [addresses, cart?.shipping_address])

   const handleSelect = (id: string) => {
      const savedAddress = addresses.find((a) => a.id === id)
      
      
      if (savedAddress) {
         cartUpdate({
            shipping_address: omit(savedAddress, [
               "id",
               "created_at",
               "updated_at",
               "country",
               "deleted_at",
               "metadata",
               "customer_id",
            ]) as AddressPayload,
         })
      }else{
         console.log("couldn't update cart addrress");
      }
      console.log(savedAddress);
      console.log(selectedAddress)
      console.log(cart?.shipping_address);
   }
   
   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger className="max-w-full" asChild>
            <Button 
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="flex justify-between"
            >
               <p className="max-sm:text-xs text-left flex-1 bg-red-200">
                  {selectedAddress ? selectedAddress.address_1 : "Select address..."}
               </p>
               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="max-w-full p-0">
            <Command>
               <CommandList>
                  <CommandGroup>
                     {addresses.map((address) => (
                        <CommandItem
                           className="flex gap-2 items-center"
                           value={address.address_1 as string}
                           key={address.id}
                           onSelect={() => {
                              handleSelect(address.id)
                           }}
                        >
                           {address.address_1}
                           <CheckIcon
                              className={cn(
                                 "ml-auto h-4 w-4",
                                 selectedAddress?.address_1 === address.address_1 ? "opacity-100" : "opacity-0"
                              )}
                           />
                        </CommandItem>
                     ))}
                  </CommandGroup>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   )
}

export default AddressSelect
