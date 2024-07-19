import { buttonVariants } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
   title: "404",
   description: "Something went wrong",
}

const NotFound = () => {
   return (
      <section className="min-h-[calc(100vh-64px)] py-20 grid place-items-center">
         <div className="text-center">
            <p className="text-base font-semibold text-zinc-800">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-muted-foreground max-sm:text-sm">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex max-sm:flex-col items-center justify-center gap-6">
               <Link href="/" className={buttonVariants()}>Go back home</Link>
               <Link href="#" className="text-sm font-semibold text-primary flex items-center group">
                  Contact support <ChevronRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 duration-300"/>
               </Link>
            </div>
         </div>
      </section>
      
   )
}

export default NotFound
