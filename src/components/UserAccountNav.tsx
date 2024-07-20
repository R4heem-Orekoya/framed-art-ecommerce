import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CustomLink from "./CustomLink"
import { getCustomer, listRegions } from "@/data"
import { buttonVariants } from "./ui/button"
import { User } from "lucide-react"

const UserAccountNav = async () => {
  const customer = await getCustomer()
  const regions = await listRegions()
  
  
  if(!customer || !regions ) {
    return (
      <div className="flex items-center gap-6 max-sm:gap-3 h-full">
        <CustomLink className="max-sm:hidden text-zinc-700 hover:text-primary text-sm duration-300" href="/sign-in">Sign in</CustomLink>
        <div className="h-5 w-[1px] bg-zinc-200 max-sm:hidden"/>
        <CustomLink className="max-sm:hidden text-zinc-700 hover:text-primary text-sm duration-300" href="/sign-up">Sign up</CustomLink>
        <CustomLink href="/account" className="sm:hidden">
          <User strokeWidth={1.5} className="w-6 h-6 max-sm:w-5 max-sm:h-5 text-zinc-500 hover:text-zinc-700 duration-300"/>
        </CustomLink>
      </div>
    )
  }
  
  return(
    <CustomLink href="/account">
      <User strokeWidth={1.5} className="w-6 h-6 max-sm:w-5 max-sm:h-5 text-zinc-500 hover:text-zinc-700 duration-300"/>
    </CustomLink>
  )
}

export default UserAccountNav
