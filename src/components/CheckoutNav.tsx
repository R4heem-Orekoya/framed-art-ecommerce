import { ArrowLeft } from "lucide-react"
import CustomLink from "./CustomLink"
import Logo from "./Logo"

const CheckoutNav = () => {
   return (
      <header className="w-screen border-b border-zinc-100">
         <nav className="w-[min(1400px,90%)] mx-auto h-16 flex items-center justify-between">
            <CustomLink href="/cart" className="text-xs font-semibold text-zinc-800 flex items-center gap-1 group">
               <ArrowLeft className="w-4 h-4 rotate-45 group-hover:rotate-0 transition"/>
               BACK TO CART
            </CustomLink>
            <CustomLink href="/" className="flex-1">
               <Logo className="w-24 ml-auto"/>
            </CustomLink>
            <div className="flex-1 basis-0 max-sm:hidden" />
         </nav>
      </header>
   )
}

export default CheckoutNav
