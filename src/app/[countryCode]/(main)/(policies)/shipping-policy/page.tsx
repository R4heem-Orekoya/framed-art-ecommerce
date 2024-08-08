import CustomLink from "@/components/CustomLink"

const page = () => {
   return (
      <section className="min-h-[calc(100dvh-64px)] py-16 max-w-xl mx-auto">
         <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold">Shipping Policy</h2>
         
         <div className="grid gap-3 prose prose-p:my-1 prose-blockquote:not-italic mt-8">
            <div>
               <p className="font-medium text-lg">Order Processing:</p>
               <p>
                  Please allow 24h to process your order. 
                  Expect an email within 2 working days to let 
                  you know your order is on the way!
               </p>
            </div>
            <div>
               <p className="font-medium text-lg">Shipping Rates:</p>
               <p>
                  We offer shipping to the USA and Nigeria. Shipping charges 
                  for your order will be calculated and displayed 
                  at checkout. We offer international shipping, so rates will be 
                  location dependant, but usually range from $5 for small 
                  posters to $20 for large ready-to-hang framed 
                  posters. Note that these are only an example. Final 
                  charges will be calculated during checkout. For orders of 
                  multiple items.
               </p>
            </div>
            <div>
               <p className="font-medium text-lg">Shipping Information and Options:</p>
               <p>
                  You can choose between Standard/Economy(typical domestic
                  delivery within 4-5 days) and Express shipping (prioritized expedited delivery).
               </p>
            </div>
            <div>
               <p className="font-medium text-lg">Delivery Times:</p>
               <p>
                  Most international orders take 4-10 days to be delivered, 
                  depending on the shipping address. A tracking code will be 
                  supplied when you place the order.
               </p>
               <blockquote>
                  *Delivery time includes us receiving your order, production 
                  and delivery to your adress. Delivery times and shipping 
                  costs are estimates and cannot be guaranteed. You will 
                  see the final costs and delivery times at checkout.
               </blockquote>
               <p>
                  Delivery times encompass production, fulfillment, and 
                  shipping durations, influenced by factors such as:
               </p>
               <ul>
                  <li>Product type</li>
                  <li>Production and delivery locations</li>
                  <li>Order size and dimensions</li>
                  <li>Production capacity</li>
                  <li>Shipping method</li>
               </ul>
            </div>
            <div>
               <p className="font-medium text-lg">Refunds, Returns & Exchanges</p>
               <p>
                  We have a 10-day return policy, which means you have 10 days 
                  after receiving your item to request a return.
               </p>
               <p>
                  To be eligible for a return, your item must be in the same 
                  condition that you received it, unworn or unused, with tags, 
                  and in its original packaging. You’ll also need the receipt 
                  or proof of purchase.
               </p>
               <p>
                  More information on returns can be found in our 
                  <span><CustomLink href="return-policy"> Refund Policy.</CustomLink></span> 
               </p>
            </div>
         </div>
      </section>
   )
}

export default page