import { Order } from "@medusajs/medusa"
import { Separator } from "./ui/separator"
import { formatAmount } from "@/lib/util/prices"
import { paymentInfoMap } from "@/lib/constants"

interface PaymentDetailsProps {
  order: Order
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payments[0]
  
  return (
    <div>
      <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold my-8">
        Payment
      </h4>
      <div>
        {payment && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium mb-2">
                Payment method
              </p>
              <p className="text-sm text-muted-foreground" data-testid="payment-method">
                {paymentInfoMap[payment.provider_id].title}
              </p>
            </div>
            <div>
              <p className="font-medium mb-2">
                Payment details
              </p>
              <div className="flex gap-2 text-sm text-muted-foreground items-start">
                <div className="mt-1">
                  {paymentInfoMap[payment.provider_id].icon}
                </div>
                <p data-testid="payment-amount">
                  {
                    payment.provider_id === "stripe" && 
                    payment.data.card_last4? `**** **** **** ${payment.data.card_last4}`: 
                    `${formatAmount({
                        amount: payment.amount,
                        region: order.region,
                        includeTaxes: false,
                    })} paid at ${new Date(payment.created_at).toString()}`
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Separator className="bg-zinc-100 mt-8" />
    </div>
  )
}

export default PaymentDetails
