"use client"

import { formatAmount } from "@/lib/util/prices"
import CustomLink from "./CustomLink"
import { LineItem, Region } from "@medusajs/medusa"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Loader2, Trash2 } from "lucide-react"
import { useState } from "react"
import { deleteLineItem, updateLineItem } from "@/actions/cart-actions"

interface CartItemProps {
   region: Region
   item: Omit<LineItem, "beforeInsert">,
   i: number
   itemsLength: number
}

const CartItem = ({ region, item, i, itemsLength }: CartItemProps) => {
   const [updating, setUpdating] = useState(false)
   const [isDeleting, setIsDeleting] = useState(false)
   
   const changeQuantity = async (quantity: number) => {
      setUpdating(true)
  
      await updateLineItem({
        lineId: item.id,
        quantity,
      })
      .catch((err) => {
         return err.message
      })
      .finally(() => {
         setUpdating(false)
      })
  
      // message && setError(message)
   }
   
   const handleDelete = async (id: string) => {
      setIsDeleting(true)
      await deleteLineItem(id).catch((err) => {
        setIsDeleting(false)
      })
   }
   
   return (
      <div key={item.id} className={cn("py-4 sm:py-6 flex gap-4 border-zinc-100 overflow-x-auto", { "border-t": i === 0 , "border-b": itemsLength === 1 })}>
         <CustomLink href={`/products/${item.variant.product.handle}`} className="max-[430px]:size-20 size-40 border border-zinc-100 rounded-lg relative overflow-hidden">
            <Image src={item.thumbnail as string} fill className="object-cover" alt={item.title}/>
         </CustomLink>
         <div className="flex-1 flex justify-between flex-col py-2">
            <div className="flex justify-between items-start max-[430px]:flex-col max-[430px]:gap-2">
               <div className="flex flex-col gap-1">
                  <h4 className="sm:text-xl font-semibold text-primary mb-2">{item.title}</h4>
                  <div className="text-sm">
                     <span className="text-muted-foreground">Variant: </span>
                     <span className="text-zinc-800 font-medium">{item.variant.title}</span>
                  </div>
                  <div className="text-sm">
                     <span className="text-muted-foreground">Price: </span>
                     <span className="text-zinc-800 font-medium">
                        {formatAmount({
                           amount: item.unit_price,
                           region: region,
                           includeTaxes: false
                        })}
                     </span>
                  </div>
                  <div className="text-sm flex items-center">
                     <span className="text-muted-foreground">Total: </span>
                     <span className="text-zinc-800 font-medium">
                        {formatAmount({
                           amount: (item.unit_price * item.quantity),
                           region: region,
                           includeTaxes: false
                        })}
                     </span>
                     <span>
                        {updating && <Loader2 className="w-3 h-3 ml-1 animate-spin text-muted-foreground"/>}
                     </span>
                  </div>
               </div>
               
               <select
                  value={item.quantity}
                  // defaultValue={item.quantity}
                  onChange={e => {
                     changeQuantity(parseInt(e.target.value))
                  }} 
                  name="qty" id="qty" className="relative z-2 px-3 py-1.5 text-lg border border-zinc-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                  {Array.from({
                     length: item.variant.inventory_quantity > 0 ? 3 : 0
                  }).map((_, i) => (
                     <option key={i} value={i + 1}>{i + 1}</option>
                  ))}
               </select>
            </div>
            
            <button onClick={() => handleDelete(item.id)} 
               className="flex gap-1 items-center ml-auto font-medium opacity-70 hover:opacity-100 duration-300">
               {isDeleting ? <Loader2 className="w-4 h-4 animate-spin text-red-500"/> : <Trash2 className="w-4 h-4 text-red-500"/>}
               delete
            </button>
         </div>
      </div>
   )
}

export default CartItem
