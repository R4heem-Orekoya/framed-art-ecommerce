import { Instagram, Twitter } from "lucide-react"
import Logo from "./Logo"

const Footer = () => {
   return (
      <footer className="bg-zinc-50 border-t border-zinc-100 py-16">
         <div className="w-[min(1400px,90%)] mx-auto flex flex-col justify-center items-center">
            <Logo className="w-28 md:w-48"/>
            <div className="w-full mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
               <p className="text-zinc-500 text-center sm:text-left">© {new Date().getFullYear()} All Rights Reserved</p>
               <ul className="flex gap-4 justify-center sm:justify-end">
                  <li>
                     <a href="#">
                        <Twitter strokeWidth={1.6} size={20} className="text-muted-foreground hover:text-zinc-800 transition"/>
                     </a>
                  </li>
                  <li>
                     <a href="#">
                        <Instagram strokeWidth={1.6} size={20} className="text-muted-foreground hover:text-zinc-800 transition"/>
                     </a>
                  </li>
               </ul>
            </div>
            
         </div>
      </footer>
   )
}

export default Footer