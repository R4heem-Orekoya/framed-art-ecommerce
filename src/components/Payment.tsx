"use client"

import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Cart } from "@medusajs/medusa"
import { setPaymentMethod } from "@/actions/checkout-actions"
import { cn } from "@/lib/utils"
import { CircleCheck } from "lucide-react"
import { Button } from "./ui/button"

const Payment = ({ cart }: { cart: Omit<Cart, "refundable_amount" | "refunded_total"> | null}) => {
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)
   const [cardBrand, setCardBrand] = useState<string | null>(null)
   const [cardComplete, setCardComplete] = useState(false)
   
   const searchParams = useSearchParams()
   const router = useRouter()
   const pathname = usePathname()
 
   const isOpen = searchParams.get("step") === "payment"
   
   const paymentReady = (cart?.payment_session && cart?.shipping_methods.length !== 0)
   
   const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
  
        return params.toString()
      },
      [searchParams]
   )
   
   const set = async (providerId: string) => {
      setIsLoading(true)
      await setPaymentMethod(providerId).catch((err) => setError(err.toString()))
      .finally(() => {
         if (providerId === "paypal") return
         setIsLoading(false)
      })
   }
  
   const handleChange = (providerId: string) => {
      setError(null)
      set(providerId)
   }
  
   const handleEdit = () => {
      router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
      })
   }
   
   const handleSubmit = () => {
      setIsLoading(true)
      router.push(pathname + "?" + createQueryString("step", "review"), {
         scroll: false,
      })
   }
   
   useEffect(() => {
      setIsLoading(false)
      setError(null)
   }, [isOpen])
   
   
   return (
      <>
         <div className="flex items-center justify-between mb-6">
            <h2 className={cn("flex items-center gap-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-zinc-800", {
               "opacity-50 pointer-events-none select-none": !isOpen && !paymentReady
            })}>
               Payment
               {!isOpen && paymentReady && <CircleCheck className="w-5 h-5 text-muted-foreground"/>}
            </h2>
            {!isOpen && paymentReady && (
               <Button
                  variant="ghost"
                  onClick={handleEdit}
                  data-testid="edit-address-button"
               >
                  Edit
               </Button>
            )}
         </div>
      </>
   )
}

export default Payment
