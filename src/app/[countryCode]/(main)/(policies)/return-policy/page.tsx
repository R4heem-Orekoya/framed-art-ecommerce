const page = () => {
   return (
      <section className="min-h-[calc(100dvh-64px)] py-16 max-w-xl mx-auto">
         <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold">Return Policy</h2>
         <div className="grid gap-2 prose prose-p:my-1 prose-blockquote:not-italic mt-8">
            <p>
               We have a 10-day return policy, which means you have 10 
               days after receiving your item to request a return.
            </p>
            <p>
               To be eligible for a return, your item must be in the 
               same condition that you received it, unworn or unused, 
               with tags, and in its original packaging. You’ll 
               also need the receipt or proof of purchase.
            </p>
            <p>
               Should you wish to return the framed-art, you can contact us at 
               info@framedart.com. If your return is accepted, you have to find 
               a shipping company as well as pay for the return shipping on your 
               own and send it to:
            </p>
            <b>
               <p>Our Address</p>
               <p>Random street 142,</p>
               <p>2440 random</p>
            </b>
            <p>
               Once we have received the product and it is all good we 
               will make the refund and you will receive a full refund 
               for the product - but minus the delivery charge.
            </p>
            <p>
               You can always contact us for any return question 
               at <a href="mailto:support@framedart.com">support@framedart.com</a>.
            </p>
            <div className="my-4">
               <p className="font-medium text-lg">Damages and issues</p>
               <p>
                  Please inspect your order upon reception and contact us 
                  immediately if the item is defective, damaged or if you 
                  receive the wrong item, so that we can evaluate the issue 
                  and make it right.
               </p>
            </div>
            
            <p>Unfortunately, we cannot accept returns on sale items or gift cards.</p>
            
            <div className="my-4">
               <p className="font-medium text-lg">Exchanges</p>
               <p>
                  The fastest way to ensure you get what you want is to 
                  return the item you have, and once the return is accepted, 
                  make a separate purchase for the new item.
               </p>
            </div>
            <div className="my-4">
               <p className="font-medium text-lg">Refunds</p>
               <p>
                  We will notify you once we’ve received and inspected your return, 
                  and let you know if the refund was approved or not. If approved, 
                  you’ll be automatically refunded on your original payment method 
                  within 10 business days. Please remember it can take some time for 
                  your bank or credit card company to process and post the refund too.
                  If more than 15 business days have passed since we’ve approved your 
                  return, please contact us at info@framedart.com.
               </p>
            </div>
         </div>
      </section>
   )
}

export default page
