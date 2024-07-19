"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SortOptions } from "@/types/global"
import { Check, Filter } from "lucide-react"
import { Button } from "./ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useCallback } from "react"

const SortComponent = ({ sortBy }: { sortBy: SortOptions }) => {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   
   const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
  
        return params.toString()
      },
      [searchParams]
   )
   
   const setQueryParams = (name: string, value: string) => {
      const query = createQueryString(name, value)
      router.push(`${pathname}?${query}`)
   }
   const handleChange = (b: string) => {
      const newSortBy = b as SortOptions
      setQueryParams("sortBy", newSortBy)
   }
    
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost">
               Sort
               <Filter strokeWidth={1.5} className="w-4 h-4 ml-2 text-zinc-500"/>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem 
               onClick={() => {
                  handleChange("created_at")
               }}
               className="cursor-pointer">
               Latest Arrivals
               {!sortBy || sortBy === "created_at"  && <Check className="w-4 h-4 text-muted-foreground ml-2"/>}
            </DropdownMenuItem>
            <DropdownMenuItem
               onClick={() => {
                  handleChange("price_asc")
               }}
               className="cursor-pointer">
               Price: Low to High
               {sortBy === "price_asc" && <Check className="w-4 h-4 text-muted-foreground ml-2"/>}
            </DropdownMenuItem>
            <DropdownMenuItem
               onClick={() => {
                  handleChange("price_desc")
               }}
               className="cursor-pointer">
               Price: High to Low
               {sortBy === "price_desc" && <Check className="w-4 h-4 text-muted-foreground ml-2"/>}
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default SortComponent
