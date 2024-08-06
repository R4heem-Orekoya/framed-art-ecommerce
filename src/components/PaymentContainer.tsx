import { PaymentSession } from "@medusajs/medusa"
import React from "react"
import { RadioGroupItem } from "./ui/radio-group"
import { cn } from "@/lib/utils"
import PaymentTest from "./PaymentTest"
import { Label } from "./ui/label"

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selectedPaymentOptionId: string | null
  disabled?: boolean
  handleChange: (providerId: string) => void
  paymentInfoMap: Record<string, { title: string; icon: JSX.Element }>
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({ paymentSession, selectedPaymentOptionId, paymentInfoMap, handleChange, disabled = false }) => {
   const isDevelopment = process.env.NODE_ENV === "development"

   return (
      <div 
         key={paymentSession.id} className={cn("flex flex-col gap-4 border border-zinc-200 hover:ring-1 hover:ring-zinc-300 px-4 py-4 sm:py-6 rounded-md cursor-pointer",
            {
               "border-zinc-800 border-2": selectedPaymentOptionId === paymentSession.provider_id,
            }
         )} 
         onClick={() => {
            handleChange(paymentSession.provider_id)
         }}
      >
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
               <RadioGroupItem
                  checked={selectedPaymentOptionId === paymentSession.provider_id}
                  disabled={disabled}
                  value={paymentSession.provider_id}
                  id={paymentSession.provider_id}
               />
               <Label htmlFor={paymentSession.provider_id} className="cursor-pointer">
                  {paymentInfoMap[paymentSession.provider_id]?.title || paymentSession.provider_id}
               </Label>

               {paymentSession.provider_id === "manual" && isDevelopment && (
                  <PaymentTest className="hidden sm:block text-xs self-start" />
               )}
            </div>
            <span className="justify-self-end text-ui-fg-base">
               {paymentInfoMap[paymentSession.provider_id]?.icon}
            </span>
         </div>
         
         
         {paymentSession.provider_id === "manual" && isDevelopment && (
            <PaymentTest className="sm:hidden text-xs self-start" />
         )}
      </div>
   )
}

export default PaymentContainer
