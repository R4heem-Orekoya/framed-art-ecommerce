import { ArrowRight } from "lucide-react"
import { buttonVariants } from "./ui/button"
import CustomLink from "./CustomLink"

const ComboOffer = () => {
   return (
      <div className="py-16 grid md:grid-cols-2 gap-8">
         <div className='bg-zinc-50 border border-zinc-100 rounded-lg flex items-center p-6 md:p-8'>
            <div>
               <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-800">Our combo offer for this season</h2>
               <p className="py-6 text-muted-foreground font-medium max-sm:text-sm">
               Lorem ipsum dolor sit, amet consectetur adipisicing 
               elit. Nulla tenetur obcaecati quaerat recusandae atque 
               unde quibusdam magnam dignissimos minus ipsa.
               </p>
               <CustomLink href='/products/someid' className={buttonVariants({
                  className: "flex gap-1 group max-sm:text-xs",
                  })}
               >
                  Learn more
                  <ArrowRight className='w-4 h-4 -rotate-45 group-hover:rotate-0 transition z-10'/>
               </CustomLink>
            </div>
         </div>
         <div className='aspect-square rounded-lg border overflow-hidden'>
            {/* <Image src={image2} className="w-full h-full object-cover" alt="image1"/> */}
         </div>
      </div>
   )
}

export default ComboOffer
