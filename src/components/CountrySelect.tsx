"use client"

import { Region } from "@medusajs/medusa"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useEffect, useMemo, useState } from "react"
import { useParams, usePathname } from "next/navigation"
import ReactCountryFlag from "react-country-flag"
import { Button } from "./ui/button"
import { Check } from "lucide-react"
import { updateRegion } from "@/actions/country-actions"

type CountryOption = {
   country: string
   region: string
   label: string
}

interface CountrySelectProps {
   regions: Region[] | null
}

const CountrySelect = ({ regions }: CountrySelectProps) => {
   const [current, setCurrent] = useState<CountryOption | undefined>(undefined)
   
   const { countryCode } = useParams()
   const currentPath = usePathname().split(`/${countryCode}`)[1]
   
   const options: CountryOption[] | undefined = useMemo(() => {
      return regions
        ?.map((r) => {
          return r.countries.map((c) => ({
            country: c.iso_2,
            region: r.id,
            label: c.display_name,
          }))
        })
        .flat()
        .sort((a, b) => a.label.localeCompare(b.label))
   }, [regions])
   
   useEffect(() => {
      if (countryCode) {
        const option = options?.find((o) => o.country === countryCode)
        setCurrent(option)
      }
   }, [options, countryCode])
   
   const handleChange = (option: CountryOption) => {
      updateRegion(option.country, currentPath)
      setCurrent(option)
   }
   
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="uppercase flex gap-2 items-center -ml-2">
               <ReactCountryFlag 
                  style={{
                    width: "16px",
                    height: "16px",
                  }} 
                  countryCode={current?.country as string} svg 
               />
               {current?.country}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" className="w-44">
            {options?.map((option, i) => (
               <DropdownMenuItem
                  onClick={() => {
                     handleChange(option)
                  }}
                  key={i} className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                     <ReactCountryFlag 
                        style={{
                           width: "16px",
                           height: "16px",
                        }} 
                        countryCode={option?.country as string} svg 
                     />
                     <span>{option.label}</span>
                  </div>
                  {current == option && <Check className="w-3 h-3 text-muted-foreground"/>}
               </DropdownMenuItem>
            ))}
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default CountrySelect
