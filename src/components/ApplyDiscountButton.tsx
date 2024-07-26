import { useFormStatus } from "react-dom"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"

const ApplyDiscountButton = ({ error }: { error: string }) => {
   const { pending } = useFormStatus()
   
   
   return (
      <Button disabled={pending} className="text-sm">
         Apply
         {pending && <Loader2 className="w-3 h-3 ml-2 animate-spin"/>}
      </Button>
   )
}

export default ApplyDiscountButton
