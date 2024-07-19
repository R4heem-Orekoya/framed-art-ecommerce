import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import repeat from "@/lib/util/repeat"

const SkeletonPlaceholder = ({ limit, className }: { limit: number, className?: string }) => {
   return (
      <ul className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
         {repeat(limit).map((i) => (
            <li key={i} className="flex flex-col gap-3">
               <Skeleton className="w-full aspect-[4/5] flex-1"/>
               <Skeleton className="w-2/3 h-4"/>
               <Skeleton className="w-1/6 h-4"/>
            </li>
         ))}
      </ul>
   )
}

export default SkeletonPlaceholder