import Faq from "@/components/Faq"
import { MessageCircleMore, MessageCircleQuestion, Phone } from "lucide-react"

const page = () => {
   return (
      <div className="min-h-[calc(100dvh-64px)] py-16">
         <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold">Contact Us</h2>
         <p className="text-center mt-4 text-muted-foreground">Let us know how we can help you</p>
         
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="aspect-square flex flex-col justify-between rounded-md p-4 border border-zinc-200/40 shadow-sm">
               <div className="size-10 grid place-items-center rounded-md border border-zinc-200/40">
                  <MessageCircleMore className="w-5 h-5 text-muted-foreground" strokeWidth={1.6}/>
               </div>
               <div>
                  <h3 className="text-lg font-semibold">Chat to sales</h3>
                  <p className="text-sm text-muted-foreground">Speak to our friendly team.</p>
                  <a className="text-sm font-medium mt-6 block hover:underline" href="mailto:support@framedart.com">mailto:sales@framedart.com</a>
               </div>
            </div>
            <div className="aspect-square flex flex-col justify-between rounded-md p-4 border border-zinc-200/40 shadow-sm">
               <div className="size-10 grid place-items-center rounded-md border border-zinc-200/40">
                  <MessageCircleQuestion className="w-5 h-5 text-muted-foreground" strokeWidth={1.6}/>
               </div>
               <div>
                  <h3 className="text-lg font-semibold">Chat to support</h3>
                  <p className="text-sm text-muted-foreground">We are here to help.</p>
                  <a className="text-sm font-medium mt-6 block hover:underline" href="mailto:support@framedart.com">mailto:support@framedart.com</a>
               </div>
            </div>
            <div className="aspect-square flex flex-col justify-between rounded-md p-4 border border-zinc-200/40 shadow-sm">
               <div className="size-10 grid place-items-center rounded-md border border-zinc-200/40">
                  <Phone className="w-5 h-5 text-muted-foreground" strokeWidth={1.6}/>
               </div>
               <div>
                  <h3 className="text-lg font-semibold">Call us</h3>
                  <p className="text-sm text-muted-foreground">Mon-Fri 8am to 6pm</p>
                  <a className="text-sm font-medium mt-6 block hover:underline" href="tel:+2347014727261">+2347014727261</a>
               </div>
            </div>
         </div>
         
         <div className="mt-12">
            <Faq headingClassName="text-center"/>
         </div>
      </div>
   )
}

export default page
