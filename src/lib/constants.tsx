import React from "react"

import { CreditCard, DollarSign } from "lucide-react"
import PayPal from "@/components/icons/paypal";

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
    paystack: {
      title: "Paystack",
      icon: <CreditCard className="w-5 h-5 text-muted-foreground"/>,
    },
    stripe: {
      title: "Stripe",
      icon: <DollarSign className="w-5 h-5 text-muted-foreground"/>,
    },
    paypal: {
      title: "PayPal",
      icon: <PayPal />,
    },
    manual: {
      title: "Test payment",
      icon: <CreditCard className="w-5 h-5 text-muted-foreground"/>,
    },
  // Add more payment providers here
}

// Add currencies that don't need to be divided by 100
export const noDivisionCurrencies = [
  "krw",
  "jpy",
  "vnd",
  "clp",
  "pyg",
  "xaf",
  "xof",
  "bif",
  "djf",
  "gnf",
  "kmf",
  "mga",
  "rwf",
  "xpf",
  "htg",
  "vuv",
  "xag",
  "xdr",
  "xau",
]
