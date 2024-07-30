"use client"

import { useSearchParams, useRouter, usePathname, useParams } from "next/navigation"
import { Cart, Customer } from "@medusajs/medusa"
import { useFormState } from "react-dom"
import compareAddresses from "@/lib/util/compare-addresses"
import useToggleState from "@/lib/hooks/use-toggle-state"
import { setAddresses } from "@/actions/checkout-actions"
import { CircleCheck, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import BillingAddress from "./BillingAddress"
import ShippingAdress from "./ShippingAdress"

interface CheckOutAddressProps {
   cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null
   customer: Omit<Customer, "password_hash"> | null
}

const CheckOutAddress = ({ cart, customer }: CheckOutAddressProps) => {
   const searchParams = useSearchParams()
   const router = useRouter()
   const pathname = usePathname()
   const params = useParams()

   const countryCode = params.countryCode as string

   const isOpen = searchParams.get("step") === "address"

   const { state: sameAsSBilling, toggle: toggleSameAsBilling } = useToggleState(
      cart?.shipping_address && cart?.billing_address
         ? compareAddresses(cart?.shipping_address, cart?.billing_address)
         : true
   )

   const handleEdit = () => {
      router.push(pathname + "?step=address")
   }

   const [message, formAction] = useFormState(setAddresses, null)

   return (
      <div>
         <div className="flex flex-row items-center justify-between mb-6">
            <h2 
               className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-zinc-800"
            >
               Shipping Address
               {!isOpen && <CircleCheck className="text-muted-foreground mt-1"/>}
            </h2>
            {!isOpen && cart?.shipping_address && (
               <Button
                  variant="outline"
                  onClick={handleEdit}
                  data-testid="edit-address-button"
               >
                  Edit
               </Button>
            )}
         </div>
         
         {isOpen ? (
            <form action={formAction}>
               <div className="pb-8">
                  <ShippingAdress
                     customer={customer}
                     countryCode={countryCode}
                     checked={sameAsSBilling}
                     onChange={toggleSameAsBilling}
                     cart={cart}
                  />

                  {!sameAsSBilling && (
                  <div>
                     <h2 className="pb-6 pt-12 text-xl md:text-2xl lg:text-3xl font-semibold text-zinc-800">
                        Billing address
                     </h2>

                     <BillingAddress cart={cart} countryCode={countryCode} />
                  </div>
                  )}
                  <Button className="mt-6" data-testid="submit-address-button">Continue to delivery</Button>
                  <p className="text-sm text-red-500 font-medium" data-testid="address-error-message" >{message}</p>
               </div>
            </form>
         ) : (
         <div>
            <div className="text-small-regular">
               {cart && cart.shipping_address ? (
               <div className="flex items-start gap-x-8">
                  <div className="flex items-start gap-x-1 w-full">
                     <div className="flex flex-col w-1/3" data-testid="shipping-address-summary">
                        <p className="txt-medium-plus text-ui-fg-base mb-1">
                           Shipping Address
                        </p>
                        <p className="txt-medium text-ui-fg-subtle">
                           {cart.shipping_address.first_name}{" "}
                           {cart.shipping_address.last_name}
                        </p>
                        <p className="txt-medium text-ui-fg-subtle">
                           {cart.shipping_address.address_1}{" "}
                           {cart.shipping_address.address_2}
                        </p>
                        <p className="txt-medium text-ui-fg-subtle">
                           {cart.shipping_address.postal_code},{" "}
                           {cart.shipping_address.city}
                        </p>
                        <p className="txt-medium text-ui-fg-subtle">
                           {cart.shipping_address.country_code?.toUpperCase()}
                        </p>
                     </div>

                     <div className="flex flex-col w-1/3 " data-testid="shipping-contact-summary">
                        <p className="txt-medium-plus text-ui-fg-base mb-1">
                           Contact
                        </p>
                        <p className="txt-medium text-ui-fg-subtle">
                           {cart.shipping_address.phone}
                        </p>
                        <p className="txt-medium text-ui-fg-subtle">
                           {cart.email}
                        </p>
                     </div>

                     <div className="flex flex-col w-1/3" data-testid="billing-address-summary">
                     <p className="txt-medium-plus text-ui-fg-base mb-1">
                        Billing Address
                     </p>

                     {sameAsSBilling ? (
                        <p className="txt-medium text-ui-fg-subtle">
                           Billing- and delivery address are the same.
                        </p>
                     ) : (
                        <>
                           <p className="txt-medium text-ui-fg-subtle">
                              {cart.billing_address.first_name}{" "}
                              {cart.billing_address.last_name}
                           </p>
                           <p className="txt-medium text-ui-fg-subtle">
                              {cart.billing_address.address_1}{" "}
                              {cart.billing_address.address_2}
                           </p>
                           <p className="txt-medium text-ui-fg-subtle">
                              {cart.billing_address.postal_code},{" "}
                              {cart.billing_address.city}
                           </p>
                           <p className="txt-medium text-ui-fg-subtle">
                              {cart.billing_address.country_code?.toUpperCase()}
                           </p>
                        </>
                     )}
                     </div>
                  </div>
               </div>
               ) : (
                  <div>
                     <Loader2 className="w-4 h-4 animate-spin"/>
                  </div>
               )}
            </div>
         </div>
         )}
         <Separator className="mt-8" />
      </div>
   )
}

export default CheckOutAddress

