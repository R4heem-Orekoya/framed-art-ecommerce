import { LineItem, Region } from "@medusajs/medusa"
import { ScrollArea } from "./ui/scroll-area"
import repeat from "@/lib/util/repeat"
import { Skeleton } from "./ui/skeleton"
import Image from "next/image"
import { X } from "lucide-react"
import { formatAmount } from "@/lib/util/prices"
import { RegionInfo } from "@/types/global"

interface CheckOutItemsPreviewProps {
   items?: Omit<LineItem, "beforeInsert">[] | null
   region?: Region
}

const CheckOutItemsPreview = ({ region, items }: CheckOutItemsPreviewProps) => {
   const getAmount = (amount: number | null | undefined) => {
      return formatAmount({
        amount: amount || 0,
        region: region as RegionInfo,
        includeTaxes: false,
      })
   }
   return (
      <ScrollArea>
         <div className="max-h-80 grid gap-2">
            {items && region
               ? items.sort((a, b) => {
                     return a.created_at > b.created_at ? -1 : 1
                  }).map((item) => {
                     return (
                        <div className="flex gap-4 items-center justify-between">
                           <div className="relative size-24 border border-zinc-100/50 rounded-md overflow-hidden">
                              <Image sizes="" src={item.thumbnail as string} fill className="object-cover" alt={item.title}/>
                           </div>
                           <div className="flex flex-col gap-1 flex-1">
                              <p className="sm:text-lg font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.variant.title}</p>
                           </div>
                           <div className="flex items-center text-sm">
                              <span>{item.quantity}</span>
                              <span><X className="h-4 w-4 text-muted-foreground"/></span>
                              <span>{getAmount(item.unit_price)}</span>
                           </div>
                        </div>
                     )
                  })
               : repeat(3).map((i) => (<Skeleton key={i} className="h-20 mb-2"/>))
            }
         </div>
      </ScrollArea>
   )
}

export default CheckOutItemsPreview
