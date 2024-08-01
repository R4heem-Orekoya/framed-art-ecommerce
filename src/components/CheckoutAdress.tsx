"use client"

import { useSearchParams, useRouter, usePathname, useParams } from "next/navigation"
import { Cart, Customer } from "@medusajs/medusa"
import { useFormState, useFormStatus } from "react-dom"
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
         <div className="flex items-center justify-between mb-6">
            <h2 
               className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-zinc-800"
            >
               Shipping Address
               {!isOpen && <CircleCheck className="w-5 h-5 text-muted-foreground"/>}
            </h2>
            {!isOpen && cart?.shipping_address && (
               <Button
                  variant="ghost"
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
                  <SubmitButton />
                  <p className="text-sm text-red-500 font-medium" data-testid="address-error-message">{message}</p>
               </div>
            </form>
         ) : (
         <div>
            <div className="text-small-regular">
               {cart && cart.shipping_address ? (
               <div className="flex items-start gap-x-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                     <div className="flex flex-col gap-1 col-span-1" data-testid="shipping-address-summary">
                        <p className="text-lg font-medium mb-1">
                           Shipping Address
                        </p>
                        <p className="text-sm text-muted-foreground">
                           {cart.shipping_address.first_name}{" "}
                           {cart.shipping_address.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                           {cart.shipping_address.address_1}{" "}
                           {cart.shipping_address.address_2}
                        </p>
                        <p className="text-sm text-muted-foreground">
                           {cart.shipping_address.postal_code},{" "}
                           {cart.shipping_address.city}
                        </p>
                        <p className="text-sm text-muted-foreground">
                           {cart.shipping_address.country_code?.toUpperCase()}
                        </p>
                     </div>

                     <div className="flex flex-col gap-1 col-span-1" data-testid="shipping-contact-summary">
                        <p className="text-lg font-medium mb-1">
                           Contact
                        </p>
                        <p className="text-sm text-muted-foreground">
                           {cart.shipping_address.phone}
                        </p>
                        <p className="text-sm text-muted-foreground">
                           {cart.email}
                        </p>
                     </div>

                     <div className="flex flex-col gap-1 col-span-1" data-testid="billing-address-summary">
                        <p className="text-lg font-medium mb-1">
                           Billing Address
                        </p>

                        {sameAsSBilling ? (
                           <p className="text-sm text-muted-foreground">
                              Billing and delivery address are the same.
                           </p>
                        ) : (
                           <>
                              <p className="text-sm text-muted-foreground">
                                 {cart.billing_address.first_name}{" "}
                                 {cart.billing_address.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 {cart.billing_address.address_1}{" "}
                                 {cart.billing_address.address_2}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                 {cart.billing_address.postal_code},{" "}
                                 {cart.billing_address.city}
                              </p>
                              <p className="text-sm text-muted-foreground">
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
         <Separator className="mt-8 bg-zinc-100" />
      </div>
   )
}

const SubmitButton = () => {
   const { pending } = useFormStatus()
   return (
      <Button disabled={pending} className="mt-6 flex items-center gap-2" data-testid="submit-address-button">
         Continue to delivery
         {pending && <Loader2 className="w-4 h-3/4 animate-spin"/>}
      </Button>
   )
}

export default CheckOutAddress

