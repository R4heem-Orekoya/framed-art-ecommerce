import Logo from "./Logo"
import UserAccountNav from "./UserAccountNav"
import Link from "next/link"
import { Search, ShoppingBag } from "lucide-react"
import CustomLink from "./CustomLink"
import { enrichLineItems, retrieveCart } from "@/actions/cart-actions"
import { LineItem } from "@medusajs/medusa"
import CountrySelect from "./CountrySelect"
import { listRegions } from "@/data"

const fetchCart = async () => {
   const cart = await retrieveCart()
 
   if (cart?.items.length) {
     const enrichedItems = await enrichLineItems(cart?.items, cart?.region_id)
     cart.items = enrichedItems as LineItem[]
   }
 
   return cart
}

const Navbar = async () => {
   const cart = await fetchCart()
   const regions = await listRegions().then((regions) => regions)
   
   const totalItems = cart?.items?.reduce((acc, item) => {
     return acc + item.quantity
   }, 0) || 0
   
   return (
      <header className="w-screen sticky top-0 z-50 bg-white/30 backdrop-blur-md">
         <nav className="w-[min(1400px,90%)] mx-auto h-16 flex items-center justify-between">
            <Link href="/">
               <Logo className="w-28 max-sm:w-20"/>
            </Link>
            <div className="flex items-center gap-6 max-sm:gap-3">
               <UserAccountNav />
               <CustomLink href="/search">
                  <Search strokeWidth={1.5} className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-zinc-500 hover:text-zinc-800 duration-300"/>  
               </CustomLink>
               <CustomLink href="/cart" className="flex items-center gap-1">
                  <ShoppingBag strokeWidth={1.5} className="w-5 h-5 max-sm:w-4 max-sm:h-4 text-zinc-500 hover:text-zinc-800 duration-300"/> 
                  <span className="text-sm font-medium">({totalItems})</span>
               </CustomLink>
               <CountrySelect regions={regions}/>
            </div>
         </nav>
      </header>
   )
}

export default Navbar
