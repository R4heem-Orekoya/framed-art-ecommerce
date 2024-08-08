import { RefreshCcw, Tag, Timer, Truck } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

const Faq = () => {
   return (
      <section className="py-16">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
               Frequently asked questions
            </h2>
            
            <Accordion type="single" collapsible className="mt-10">
               <AccordionItem value="faq-1" className="py-2 sm:py-4 border-b border-zinc-100">
                  <AccordionTrigger className="sm:text-xl">
                     <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground"/>
                        Where do you ship to?
                     </div>
                  </AccordionTrigger>
                  <AccordionContent className="sm:text-lg">
                     We ship to only the United States and Nigeria! So wherever you are in the US or Nigeria, 
                     you can get our framed art shipped to you.
                  </AccordionContent>
               </AccordionItem>
               
               <AccordionItem value="faq-2" className="py-2 sm:py-4 border-b border-zinc-100">
                  <AccordionTrigger className="sm:text-xl">
                     <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground"/>
                        Do you offer free shipping?
                     </div>
                  </AccordionTrigger>
                  <AccordionContent className="sm:text-lg">
                     <p>
                        No, we do not offer free shipping as these poducts are fragile and need to be handled with absolute care during delivery.
                     </p>
                     <p className="mt-2">Shipping charges for your order will be calculated and displayed at checkout.</p>
                  </AccordionContent>
               </AccordionItem>
               
               <AccordionItem value="faq-3" className="py-2 sm:py-4 border-b border-zinc-100">
                  <AccordionTrigger className="sm:text-xl">
                     <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground"/>
                        How long does it take?
                     </div>
                  </AccordionTrigger>
                  <AccordionContent className="sm:text-lg">
                     Orders processed will take 3-5 business days to arrive. 
                     Overseas deliveries can take anywhere from 7-14 days. 
                     Delivery details will be provided in your confirmation email.
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="faq-4" className="py-2 sm:py-4 border-b border-zinc-100">
                  <AccordionTrigger className="sm:text-xl">
                     <div className="flex items-center gap-2">
                        <RefreshCcw className="w-4 h-4 sm:w-6 sm:h-6 text-muted-foreground"/>
                        Can i return my purchase?
                     </div>
                  </AccordionTrigger>
                  <AccordionContent className="sm:text-lg">
                     <p>
                        If you really want to, yes you can! 
                        We have a 10-day return policy, which means 
                        you have 10 days after receiving your item to 
                        request a return.
                     </p>
                     <p className="mt-2">
                        If the frame not quite right? No worries - we can 
                        exchange your purchase for a new one.  
                     </p>
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>
      </section>
   )
}

export default Faq
