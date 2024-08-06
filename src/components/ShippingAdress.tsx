"use client"

import { Cart, Customer } from "@medusajs/medusa"
import { useEffect, useMemo, useState } from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Checkbox } from "./ui/checkbox"
import AddressSelect from "./AddressSelect"

interface ShippingAdressProps {
   customer: Omit<Customer, "password_hash"> | null
   cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
   checked: boolean
   onChange: () => void
   countryCode: string
}

const ShippingAdress = ({ customer, cart, checked, onChange, countryCode } : ShippingAdressProps) => {
   const [formData, setFormData] = useState({
      "shipping_address.first_name": cart?.shipping_address?.first_name || "",
      "shipping_address.last_name": cart?.shipping_address?.last_name || "",
      "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
      "shipping_address.company": cart?.shipping_address?.company || "",
      "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
      "shipping_address.city": cart?.shipping_address?.city || "",
      "shipping_address.country_code":
        cart?.shipping_address?.country_code || countryCode || "",
      "shipping_address.province": cart?.shipping_address?.province || "",
      email: cart?.email || "",
      "shipping_address.phone": cart?.shipping_address?.phone || "",
   })
   
   const countriesInRegion = useMemo(() => cart?.region.countries.map((c) => c.iso_2),
      [cart?.region]
   )
   
   // check if customer has saved addresses that are in the current region
   const addressesInRegion = useMemo(() =>
      customer?.shipping_addresses.filter(
         (a) => a.country_code && countriesInRegion?.includes(a.country_code)
      ),
      [customer?.shipping_addresses, countriesInRegion]
   )
   
   useEffect(() => {
      setFormData({
         "shipping_address.first_name": cart?.shipping_address?.first_name || "",
         "shipping_address.last_name": cart?.shipping_address?.last_name || "",
         "shipping_address.address_1": cart?.shipping_address?.address_1 || "",
         "shipping_address.company": cart?.shipping_address?.company || "",
         "shipping_address.postal_code": cart?.shipping_address?.postal_code || "",
         "shipping_address.city": cart?.shipping_address?.city || "",
         "shipping_address.country_code":
            cart?.shipping_address?.country_code || "",
         "shipping_address.province": cart?.shipping_address?.province || "",
         email: cart?.email || "",
         "shipping_address.phone": cart?.shipping_address?.phone || "",
      })
   }, [cart?.shipping_address, cart?.email])
   
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
         {customer && (addressesInRegion?.length || 0) > 0 && (
            <div className="mb-8 flex flex-col gap-y-4 p-4 border border-zinc-200 rounded-md">
               <p className="text-sm font-medium">
                  {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
               </p>
               <AddressSelect addresses={customer.shipping_addresses} cart={cart} />
            </div>
         )}
         
         <div className="grid gap-x-4 gap-y-6 grid-cols-1 md:grid-cols-2">
            <div className="col-span-1 grid gap-2">
               <Label>First name</Label>
               <Input
                  name="shipping_address.first_name"
                  autoComplete="given-name"
                  value={formData["shipping_address.first_name"]}
                  onChange={handleChange}
                  required
                  data-testid="shipping-first-name-input"
               />
            </div>
            <div className="col-span-1 grid gap-2">
               <Label>Last name</Label>
               <Input
                  name="shipping_address.last_name"
                  autoComplete="family-name"
                  value={formData["shipping_address.last_name"]}
                  onChange={handleChange}
                  required
                  data-testid="shipping-last-name-input"
               />
            </div>
            <div className="col-span-1 grid gap-2">
               <Label>Address</Label>
               <Input
                  name="shipping_address.address_1"
                  autoComplete="address-line1"
                  value={formData["shipping_address.address_1"]}
                  onChange={handleChange}
                  required
                  data-testid="shipping-address-input"
               />
            </div>
            <div className="col-span-1 grid gap-2">
               <Label>Company</Label>
               <Input
                  name="shipping_address.company"
                  value={formData["shipping_address.company"]}
                  onChange={handleChange}
                  autoComplete="organization"
                  data-testid="shipping-company-input"
               />
            </div>
            <div className="col-span-1 grid gap-2">
               <Label>Postal code</Label>
               <Input
                  name="shipping_address.postal_code"
                  autoComplete="postal-code"
                  value={formData["shipping_address.postal_code"]}
                  onChange={handleChange}
                  required
                  data-testid="shipping-postal-input"
               />
            </div>
            <div className="col-span-1 grid gap-2">
               <Label>City</Label>
               <Input
                  name="shipping_address.city"
                  autoComplete="address-level2"
                  value={formData["shipping_address.city"]}
                  onChange={handleChange}
                  required
                  data-testid="shipping-city-input"
               />
            </div>
            
            <select 
               className="col-span-1 h-10 px-2 self-end rounded-md border border-input"
               name="shipping_address.country_code"
               autoComplete="country"
               value={formData["shipping_address.country_code"]}
               onChange={handleChange}
               required
               data-testid="shipping-country-select"
            >
               {countryOptions.map((opt, i) => (
                  <option key={i} value={opt.value}>{opt.label}</option>
               ))}
            </select>
            
            <div className="col-span-1 grid gap-2">
               <Label>State / Province</Label>
               <Input
                  name="shipping_address.province"
                  autoComplete="address-level1"
                  value={formData["shipping_address.province"]}
                  onChange={handleChange}
                  data-testid="shipping-province-input"
               />
            </div>
            <div className="col-span-1 grid gap-2">
               <Label>Phone</Label>
               <Input
                  name="shipping_address.phone"
                  autoComplete="tel"
                  value={formData["shipping_address.phone"]}
                  onChange={handleChange}
                  data-testid="shipping-phone-input"
               />
            </div>
         </div>
         
         <div className="col-span-1 my-8 flex items-center gap-2">
            <Checkbox
               id="same_as_billing"
               name="same_as_billing"
               checked={checked}
               onClick={() => {
                  onChange()
               }}
               data-testid="billing-address-checkbox"
            />
            <Label htmlFor="same_as_billing" className="max-sm:text-xs cursor-pointer">Billing address same as shipping address</Label>
         </div>
         <div className="col-span-1 grid gap-8 grid-cols-1 md:grid-cols-2">
            <div className="grid gap-2">
               <Label>Email</Label>
               <Input
                  name="email"
                  type="email"
                  title="Enter a valid email address."
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="shipping-email-input"
               />
            </div>
            <div className="grid gap-2">
               <Label>Phone</Label>
               <Input
                  name="shipping_address.phone"
                  autoComplete="tel"
                  value={formData["shipping_address.phone"]}
                  onChange={handleChange}
                  data-testid="shipping-phone-input"
               />
            </div>
         </div>
      </>
   )
}

export default ShippingAdress
