import { Facebook, Instagram, Twitter } from "lucide-react"
import CustomLink from "./CustomLink"
import Logo from "./Logo"

const Footer = () => {
   return (
      <footer className="bg-zinc-50/50 border-t border-zinc-100 py-16">
         <div className="w-[min(1400px,90%)] mx-auto">
            <div className="flex items-start justify-between max-sm:flex-col gap-8">
               <Logo className="w-28"/>
               
               <div className="flex justify-between max-sm:flex-col gap-8">
                  <div>
                     <p className="text-lg font-medium">Collections</p>
                     <ul className="text-sm text-muted-foreground mt-2 grid gap-1">
                        <li className="hover:text-primary font-medium">
                           <CustomLink href="/collections/bestselling">Best selling</CustomLink>
                        </li>
                        <li className="hover:text-primary font-medium">
                           <CustomLink href="/collections/newarrivals">New Arrivals</CustomLink>
                        </li>
                        <li className="hover:text-primary font-medium">
                           <CustomLink href="/collections/art">Art</CustomLink>
                        </li>
                        <li className="hover:text-primary font-medium">
                           <CustomLink href="/collections/sports">Sports</CustomLink>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <p className="text-lg font-medium">Policies</p>
                     <ul className="text-sm text-muted-foreground mt-2 grid gap-1">
                        <li className="hover:text-primary font-medium">
                           <CustomLink href="/collections/shipping-policy">Shipping policy</CustomLink>
                        </li>
                        <li className="hover:text-primary font-medium">
                           <CustomLink href="/collections/return-policy">Return Policy</CustomLink>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
            <div className="mt-12 flex justify-between items-center gap-6 max-sm:flex-col max-sm:items-start">
               <p className="text-sm font-medium text-muted-foreground">© 2024 Framed Art Store. All rights reserved.</p>
               <ul className="flex items-center gap-4">
                  <li>
                     <a href="#"><Facebook className="w-5 h-5 text-muted-foreground hover:text-primary" strokeWidth={1.5}/></a>
                  </li>
                  <li>
                     <a href="#"><Instagram className="w-5 h-5 text-muted-foreground hover:text-primary" strokeWidth={1.5}/></a>
                  </li>
                  <li>
                     <a href="#"><Twitter className="w-5 h-5 text-muted-foreground hover:text-primary" strokeWidth={1.5}/></a>
                  </li>
               </ul>
            </div>
         </div>
      </footer>
   )
}

export default Footer