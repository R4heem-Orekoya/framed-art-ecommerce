import { createPaymentSessions, getCustomer, listCartShippingMethods } from '@/data'
import { getCheckoutStep } from '@/lib/util/get-checkout-step'
import { CartWithCheckoutStep } from '@/types/global'
import { cookies } from 'next/headers'
import React from 'react'
import CheckOutAddress from './CheckoutAdress'

const CheckoutForm = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  // create payment sessions and get cart
  const cart = (await createPaymentSessions(cartId).then(
    (cart) => cart
  )) as CartWithCheckoutStep

  if (!cart) {
    return null
  }
  
  cart.checkout_step = cart && getCheckoutStep(cart)

  // get available shipping methods
  const availableShippingMethods = await listCartShippingMethods(cart.id).then(
    (methods) => methods?.filter((m) => !m.is_return)
  )

  if (!availableShippingMethods) {
    return null
  }

  // get customer if logged in
  const customer = await getCustomer()
  
  return (
    <div className="col-span-1 md:col-span-3 py-12 md:pr-6 grid gap-8">
      <div>
        <CheckOutAddress cart={cart} customer={customer}/>
      </div>
    </div>
  )
}

export default CheckoutForm
