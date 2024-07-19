import useToggleState from "@/lib/hooks/use-toggle-state"
import { useEffect } from "react"

import { useFormStatus } from "react-dom"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

type AccountInfoProps = {
   label: string
   currentInfo: string | React.ReactNode
   isSuccess?: boolean
   isError?: boolean
   errorMessage?: string
   clearState: () => void
   children?: React.ReactNode
   'data-testid'?: string
}

const AccountInfo = ({ label, currentInfo, isSuccess, isError, clearState, errorMessage = "An error occurred, please try again", children, 'data-testid': dataTestid }: AccountInfoProps) => {
   const { state, close, toggle } = useToggleState()

   const { pending } = useFormStatus()

   const handleToggle = () => {
      clearState()
      setTimeout(() => toggle(), 500)
   }

   useEffect(() => {
      if (isSuccess) {
         close()
      }
   }, [isSuccess, close])

   return (
      <div data-testid={dataTestid} className="flex flex-col gap-1 border-b border-zinc-100">
         <div className="flex justify-between hover:no-underline">
            <div className="flex items-start flex-col">
               <span className="uppercase text-sm">{label}</span>
               <div className="flex items-center flex-1 basis-0 justify-end gap-4">
                  {typeof currentInfo === "string" ? (
                  <span className="font-medium text-zinc-800" data-testid="current-info">{currentInfo}</span>
                  ) : (
                  currentInfo
                  )}
               </div>
            </div>
            <Button
               variant="outline"
               size="sm"
               className="self-end"
               onClick={handleToggle}
               type={state ? "reset" : "button"}
               data-testid="edit-button"
               data-active={state}
            >
               {state ? "Cancel" : "Edit"}
            </Button>
         </div>
         
         {/* Success state */}
         <div 
            className={cn(
               "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden", 
               {
                  "max-h-[1000px] opacity-100": isSuccess, "max-h-0 opacity-0": !isSuccess 
               }
            )}
            data-testid="success-message"
         >
            <Badge className="rounded-md hover:bg-green-500 p-2 my-4 bg-green-500 text-white">
               <span>{label} updated succesfully</span>
            </Badge>
         </div>
                  
         {/* Error state  */}
         <div 
            className={cn("transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden", 
               { 
                  "max-h-[1000px] opacity-100": isError, "max-h-0 opacity-0": !isError 
               }
            )}
            data-testid="error-message"
         >
            <Badge className="rounded-md hover:bg-red-500 bg-red-500 p-2 my-4">
               <span>{errorMessage}</span>
            </Badge>
         </div>
                  
         <div 
            className={cn("transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden",
               { 
                  "max-h-[1000px] opacity-100": state, "max-h-0 opacity-0": !state   
               }
            )}
         >
            <div className="flex flex-col gap-2 px-1 py-1">
               <div>{children}</div>
               <div className="flex items-center self-end">
                  <Button
                     // isLoading={pending}
                     size="sm"
                     className="w-full small:max-w-[140px] mt-2 mb-3"
                     type="submit"
                     data-testid="save-button"
                  >
                     {pending && <Loader2 className="w-4 h-4 mr-1 text-white animate-spin"/>}
                     Save changes
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AccountInfo
