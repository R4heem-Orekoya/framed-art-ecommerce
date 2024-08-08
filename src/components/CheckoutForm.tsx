import { createPaymentSessions, getCustomer, listCartShippingMethods } from '@/data'
import { getCheckoutStep } from '@/lib/util/get-checkout-step'
import { CartWithCheckoutStep } from '@/types/global'
import { cookies } from 'next/headers'
import React from 'react'
import CheckOutAddress from './CheckoutAdress'
import Delivery from './Delivery'
import Payment from './Payment'
import Wrapper from './wrappers/PaymentWrapper'
import Review from './Review'

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
    <>
      <div>
        <CheckOutAddress cart={cart} customer={customer}/>
      </div>
      <div>
        <Delivery cart={cart} availableShippingMethods={availableShippingMethods}/>
      </div>
      <div>
        <Payment cart={cart} />
      </div>
      <div>
        <Review cart={cart}/>
      </div>
    </>
  )
}

export default CheckoutForm
