import CheckoutNav from "@/components/CheckoutNav"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <section>
         <CheckoutNav />
         {children}
      </section>
   )
}

export default Layout
