import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import repeat from "@/lib/util/repeat"

const CartSkeleton = () => {
   return (
      <ul className="md:flex-1 grid divide-y-[1px] divide-zinc-100">
         {repeat(3).map((_, i) => (
            <li key={i} className={cn("py-4 sm:py-6 flex gap-4", { "border-t border-zinc-100": i === 0 })}>
               <Skeleton className="size-24 sm:size-40"/>
               
               <div className="grid flex-1 py-2 sm:py-4">
                  <Skeleton className="w-[90%] h-4 sm:h-6"/>
                  <Skeleton className="w-2/3 h-4 sm:h-6"/>
                  <Skeleton className="w-1/5 h-4 sm:h-6"/>
               </div>
            </li>
         ))}
      </ul>
   )
}

export default CartSkeleton
