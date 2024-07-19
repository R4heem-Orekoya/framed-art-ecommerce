"use client"

import React, { useState } from "react"
import { Address, Region } from "@medusajs/medusa"
import { deleteCustomerShippingAddress } from "@/actions/account-actions"
import { Loader2, Trash2 } from "lucide-react"
import { Button } from "./ui/button"
import EditAddressDialog from "./EditAddressDialog"

type EditAddressProps = {
  region: Region
  address: Address
  isActive?: boolean
}

const EditAddress: React.FC<EditAddressProps> = ({
  region,
  address,
  isActive = false,
}) => {
  const [removing, setRemoving] = useState(false)

  const removeAddress = async () => {
    setRemoving(true)
    await deleteCustomerShippingAddress(address.id)
    setRemoving(false)
  }

  return (
    <div className="border border-zinc-200 rounded-md min-h-[220px] p-4 flex flex-col justify-between" data-testid="address-container">
      <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-zinc-800" data-testid="address-name">
            {address.first_name} {address.last_name}
          </h3>
          <p className="flex flex-col mt-2 text-sm gap-2 text-muted-foreground">
            <span data-testid="address-address">
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
            <span data-testid="address-postal-city">
              {address.postal_code}, {address.city}
            </span>
            <span data-testid="address-province-country">
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </p>
      </div>
      <div className="flex items-center gap-x-4">
        <EditAddressDialog address={address}/>
          <Button
            variant="ghost"
            className="text-sm flex items-center gap-x-2"
            onClick={removeAddress}
            data-testid="address-delete-button"
          >
            {removing ? <Loader2 className="w-4 h-4 text-red-500 animate-spin"/> : <Trash2 className="w-4 h-4 text-red-500"/>}
            Remove
          </Button>
      </div>
    </div>
  )
}

export default EditAddress
