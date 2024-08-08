import CheckoutNav from "@/components/CheckoutNav"
import CustomLink from "@/components/CustomLink"
import { buttonVariants } from "@/components/ui/button"
import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <section>
         <CheckoutNav />
         {children}
         <footer className="py-8 bg-zinc-50 border-t border-zinc-100 flex items-center justify-center gap-4">
            <CustomLink className={buttonVariants({ variant: "link" })} href="/shipping-policy">Shipping policy</CustomLink>
            <CustomLink className={buttonVariants({ variant: "link" })} href="/return-policy">Return policy</CustomLink>
         </footer>
      </section>
   )
}

export default Layout
