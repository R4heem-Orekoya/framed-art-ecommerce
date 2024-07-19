"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { cookies, headers } from "next/headers"
import { Customer, StorePostCustomersCustomerAddressesAddressReq, StorePostCustomersCustomerAddressesReq, StorePostCustomersCustomerReq, StorePostCustomersReq } from "@medusajs/medusa"
import { addShippingAddress, authenticate, createCustomer, deleteShippingAddress, getToken, updateCustomer, updateShippingAddress } from "@/data"
import { TLoginCredentials, TSignupCredentials } from "@/lib/validators/auth-credentials"
import { TAddressFieldsValidator } from "@/lib/validators/address-fields"

export async function signUp(_currentState: unknown, credentials: TSignupCredentials) {
  const customer = {
    email: credentials.email,
    password: credentials.password,
    first_name: credentials.firstName,
    last_name: credentials.lastName,
    // phone: credentials.phone,
  } as StorePostCustomersReq

  try {
    await createCustomer(customer)
    await getToken({ email: customer.email, password: customer.password }).then(
      () => {
        revalidateTag("customer")
      }
    )
  } catch (error: any) {
    return { message: error.toString() }
  }
}

export async function logCustomerIn(
  _currentState: unknown,
  credentials: TLoginCredentials
) {
  const email = credentials.email
  const password = credentials.password

  try {
    await getToken({ email, password }).then(() => {
      revalidateTag("customer")
    })
  } catch (error: any) {
    return { message: error.toString() }
  }
}

export async function updateCustomerName(
  _currentState: Record<string, unknown>,
  formData: FormData
) {
  const customer = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
  } as StorePostCustomersCustomerReq

  try {
    await updateCustomer(customer).then(() => {
      revalidateTag("customer")
    })
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}

export async function updateCustomerEmail(
  _currentState: Record<string, unknown>,
  formData: FormData
) {
  const customer = {
    email: formData.get("email"),
  } as StorePostCustomersCustomerReq

  try {
    await updateCustomer(customer).then(() => {
      revalidateTag("customer")
    })
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}

export async function updateCustomerPhone(
  _currentState: Record<string, unknown>,
  formData: FormData
) {
  const customer = {
    phone: formData.get("phone"),
  } as StorePostCustomersCustomerReq

  try {
    await updateCustomer(customer).then(() => {
      revalidateTag("customer")
    })
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}

export async function updateCustomerPassword(
  currentState: {
    customer: Omit<Customer, "password_hash">
    success: boolean
    error: string | null
  },
  formData: FormData
) {
  const email = currentState.customer.email as string
  const new_password = formData.get("new_password") as string
  const old_password = formData.get("old_password") as string
  const confirm_password = formData.get("confirm_password") as string

  const isValid = await authenticate({ email, password: old_password })
    .then(() => true)
    .catch(() => false)

  if (!isValid) {
    return {
      customer: currentState.customer,
      success: false,
      error: "Old password is incorrect",
    }
  }

  if (new_password !== confirm_password) {
    return {
      customer: currentState.customer,
      success: false,
      error: "Passwords do not match",
    }
  }

  try {
    await updateCustomer({ password: new_password }).then(() => {
      revalidateTag("customer")
    })

    return {
      customer: currentState.customer,
      success: true,
      error: null,
    }
  } catch (error: any) {
    return {
      customer: currentState.customer,
      success: false,
      error: error.toString(),
    }
  }
}

export async function addCustomerShippingAddress(
  addressCredentials: TAddressFieldsValidator,
  _currentState?: Record<string, unknown>
) {
  const customer = {
    address: {
      first_name: addressCredentials.firstName as string,
      last_name: addressCredentials.lastName as string,
      address_1: addressCredentials.address as string,
      city: addressCredentials.city as string,
      postal_code: addressCredentials.postalCode as string,
      province: addressCredentials.state as string,
      country_code: addressCredentials.country as string,
      phone: addressCredentials.phone as string,
    },
  } as StorePostCustomersCustomerAddressesReq

  try {
    await addShippingAddress(customer).then(() => {
      revalidateTag("customer")
    })
    revalidatePath("/account")
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}

export async function updateCustomerShippingAddress(
  currentState: Record<string, unknown>,
  formData: FormData
) {
  const addressId = currentState.addressId as string

  const address = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    address_1: formData.get("address_1") as string,
    address_2: formData.get("address_2") as string,
    company: formData.get("company") as string,
    city: formData.get("city") as string,
    postal_code: formData.get("postal_code") as string,
    province: formData.get("province") as string,
    country_code: formData.get("country_code") as string,
    phone: formData.get("phone") as string,
  } as StorePostCustomersCustomerAddressesAddressReq

  try {
    await updateShippingAddress(addressId, address).then(() => {
      revalidateTag("customer")
    })
    return { success: true, error: null, addressId }
  } catch (error: any) {
    return { success: false, error: error.toString(), addressId }
  }
}

export async function deleteCustomerShippingAddress(addressId: string) {
  try {
    await deleteShippingAddress(addressId).then(() => {
      revalidateTag("customer")
    })
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}

export async function updateCustomerBillingAddress(
  _currentState: Record<string, unknown>,
  formData: FormData
) {
  const customer = {
    billing_address: {
      first_name: formData.get("billing_address.first_name"),
      last_name: formData.get("billing_address.last_name"),
      company: formData.get("billing_address.company"),
      address_1: formData.get("billing_address.address_1"),
      address_2: formData.get("billing_address.address_2"),
      city: formData.get("billing_address.city"),
      postal_code: formData.get("billing_address.postal_code"),
      province: formData.get("billing_address.province"),
      country_code: formData.get("billing_address.country_code"),
      phone: formData.get("billing_address.phone"),
    },
  } as StorePostCustomersCustomerReq

  try {
    await updateCustomer(customer).then(() => {
      revalidateTag("customer")
    })
    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.toString() }
  }
}

export async function signOut(countryCode: string) {
  cookies().set("_medusa_jwt", "", {
    maxAge: -1,
  })
  revalidateTag("auth")
  revalidateTag("customer")
  redirect(`/${countryCode}/account`)
}
