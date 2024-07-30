"use client"

import { useState, useEffect, useMemo } from "react"
import { Cart } from "@medusajs/medusa"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

interface BillingAddressProps {
   cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
   countryCode: string
}

const BillingAddress = ({ cart, countryCode }: BillingAddressProps ) => {
   const [formData, setFormData] = useState({
      "billing_address.first_name": cart?.billing_address?.first_name || "",
      "billing_address.last_name": cart?.billing_address?.last_name || "",
      "billing_address.address_1": cart?.billing_address?.address_1 || "",
      "billing_address.company": cart?.billing_address?.company || "",
      "billing_address.postal_code": cart?.billing_address?.postal_code || "",
      "billing_address.city": cart?.billing_address?.city || "",
      "billing_address.country_code":
         cart?.billing_address?.country_code || countryCode || "",
      "billing_address.province": cart?.billing_address?.province || "",
      "billing_address.phone": cart?.billing_address?.phone || "",
   })

   useEffect(() => {
      setFormData({
         "billing_address.first_name": cart?.billing_address?.first_name || "",
         "billing_address.last_name": cart?.billing_address?.last_name || "",
         "billing_address.address_1": cart?.billing_address?.address_1 || "",
         "billing_address.company": cart?.billing_address?.company || "",
         "billing_address.postal_code": cart?.billing_address?.postal_code || "",
         "billing_address.city": cart?.billing_address?.city || "",
         "billing_address.country_code": cart?.billing_address?.country_code || "",
         "billing_address.province": cart?.billing_address?.province || "",
         "billing_address.phone": cart?.billing_address?.phone || "",
      })
   }, [cart?.billing_address])

   const handleChange = (
      e: React.ChangeEvent<
         HTMLInputElement | HTMLInputElement | HTMLSelectElement
      >
   ) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }
   
   const countryOptions = useMemo(() => {
      if (!cart?.region) {
        return []
      }
  
      return cart.region.countries.map((country) => ({
        value: country.iso_2,
        label: country.display_name,
      }))
   }, [cart?.region])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className="col-span-1 grid gap-2">
            <Label>First name</Label>
            <Input
               name="billing_address.first_name"
               autoComplete="given-name"
               value={formData["billing_address.first_name"]}
               onChange={handleChange}
               required
               data-testid="billing-first-name-input"
            />
         </div>
         <div className="col-span-1 grid gap-2">
            <Label>Last name</Label>
            <Input
               name="billing_address.last_name"
               autoComplete="family-name"
               value={formData["billing_address.last_name"]}
               onChange={handleChange}
               required
               data-testid="billing-last-name-input"
            />
         </div>
         <div className="col-span-1 grid gap-2">
            <Label>Address</Label>
            <Input
               name="billing_address.address_1"
               autoComplete="address-line1"
               value={formData["billing_address.address_1"]}
               onChange={handleChange}
               required
               data-testid="billing-address-input"
            />
         </div>
         <div className="col-span-1 grid gap-2">
            <Label>Company</Label>
            <Input
               name="billing_address.company"
               value={formData["billing_address.company"]}
               onChange={handleChange}
               autoComplete="organization"
               data-testid="billing-company-input"
            />
         </div>
         <div className="col-span-1 grid gap-2">
            <Label>Postal code</Label>
            <Input
               name="billing_address.postal_code"
               autoComplete="postal-code"
               value={formData["billing_address.postal_code"]}
               onChange={handleChange}
               required
               data-testid="billing-postal-input"
            />
         </div>
         <div className="col-span-1 grid gap-2">
            <Label>City</Label>
            <Input
               name="billing_address.city"
               autoComplete="address-level2"
               value={formData["billing_address.city"]}
               onChange={handleChange}
               required
               data-testid="billing-city-input"
            />
         </div>
         
         <select 
            className="col-span-1 h-10 px-2 self-end rounded-md border border-input"
            name="billing_address.country_code"
            autoComplete="country"
            value={formData["billing_address.country_code"]}
            onChange={handleChange}
            required
            data-testid="billing-country-select"
         >
            {countryOptions.map((opt, i) => (
               <option key={i} value={opt.value}>{opt.label}</option>
            ))}
         </select>
         
         <div className="col-span-1 grid gap-2">
            <Label>State / Province</Label>
            <Input
               name="billing_address.province"
               autoComplete="address-level1"
               value={formData["billing_address.province"]}
               onChange={handleChange}
               data-testid="billing-province-input"
            />
         </div>
         <div className="col-span-1 grid gap-2">
            <Label>Phone</Label>
            <Input
               name="billing_address.phone"
               autoComplete="tel"
               value={formData["billing_address.phone"]}
               onChange={handleChange}
               data-testid="billing-phone-input"
            />
         </div>
      </div>
    </>
  )
}

export default BillingAddress
