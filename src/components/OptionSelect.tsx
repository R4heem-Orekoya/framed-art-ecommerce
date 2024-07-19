import { ProductOption } from "@medusajs/medusa"
import React from "react"
import { cn } from "@/lib/utils"
import { onlyUnique } from "@/lib/util/only-unique"

type OptionSelectProps = {
  option: ProductOption
  current: string
  updateOption: (option: Record<string, string>) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({ option, current, updateOption, title, "data-testid": dataTestId, disabled, }) => {
  const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

   return (
      <div className="flex flex-col gap-y-2">
         <span className="text-sm text-zinc-500 font-medium">Select {title}</span>
         <div className="grid grid-cols-4 gap-2" data-testid={dataTestId} >
            {filteredOptions.map((v) => {
               return (
                  <button
                     onClick={() => updateOption({ [option.id]: v })}
                     key={v}
                     className={cn(
                        " p-2 border-2 border-zinc-200 rounded-md text-sm text-muted-foreground font-medium",
                        {"border-primary text-primary": v === current}
                     )}
                     disabled={disabled}
                     data-testid="option-button"
                  >
                     {v}
                  </button>
               )
            })}
         </div>
      </div>
   )
}

export default OptionSelect
