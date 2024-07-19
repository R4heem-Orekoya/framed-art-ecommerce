import { Instagram, Twitter } from "lucide-react"
import Logo from "./Logo"

const Footer = () => {
   return (
      <footer className="bg-zinc-50 border-t border-zinc-100 py-16">
         <div className="w-[min(1400px,90%)] mx-auto flex flex-col justify-center items-center">
            <Logo className="w-32 md:w-48"/>
            <div className="w-full mt-16 flex justify-center sm:justify-between items-center max-sm:flex-wrap gap-8">
               <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} All Rights Reserved</p>
               
               <ul className="flex items-center gap-10 text-sm">
                  <li><a className="text-zinc-500 hover:text-zinc-800" href="#">Terms</a></li>
                  <li><a className="text-zinc-500 hover:text-zinc-800" href="#">Privacy</a></li>
                  <li><a className="text-zinc-500 hover:text-zinc-800" href="#">Cookie Policy</a></li>
               </ul>
            </div>
            
            <ul className="flex gap-4 mt-8 sm:ml-auto">
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
      </footer>
   )
}

export default Footer