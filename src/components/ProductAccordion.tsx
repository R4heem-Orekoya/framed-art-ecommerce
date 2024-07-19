import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { RefreshCw, Truck } from "lucide-react"

const ProductAccordion = ({ product } : { product: PricedProduct } ) => {
   return (
      <div className="mt-8">
         <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
               <AccordionTrigger>Product Information</AccordionTrigger>
               <AccordionContent>
                  <div className="grid grid-cols-2 gap-x-8">
                     <div className="flex flex-col gap-y-4">
                        <div>
                           <span className="font-medium">Material</span>
                           <p className="text-muted-foreground text-sm">{product.material ? product.material : "-"}</p>
                        </div>
                        <div>
                           <span className="font-medium">Country of origin</span>
                           <p className="text-muted-foreground text-sm">{product.origin_country ? product.origin_country : "-"}</p>
                        </div>
                        <div>
                           <span className="font-medium">Type</span>
                           <p className="text-muted-foreground text-sm">{product.type ? product.type.value : "-"}</p>
                        </div>
                     </div>
                     <div className="flex flex-col gap-y-4">
                        <div>
                           <span className="font-medium">Weight</span>
                           <p className="text-muted-foreground text-sm">{product.weight ? `${product.weight} g` : "-"}</p>
                        </div>
                        <div>
                           <span className="font-medium">Dimensions</span>
                           <p>
                           {product.length && product.width && product.height
                              ? `${product.length}L x ${product.width}W x ${product.height}H`
                              : "-"}
                           </p>
                        </div>
                     </div>
                  </div>
                  {product.tags?.length ? (
                     <div>
                        <span className="font-semibold">Tags</span>
                     </div>
                  ) : null}
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
               <AccordionTrigger>Shipping & Returns</AccordionTrigger>
               <AccordionContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                     <Truck className="text-muted-foreground"/>
                     <div>
                        <span className="font-semibold my-2 block">Fast delivery</span>
                        <p className="text-muted-foreground">
                           Your package will arrive in 3-5 business days at your pick up
                           location or in the comfort of your home.
                        </p>
                     </div>
                  </div>
                  <div>
                     <RefreshCw className="text-muted-foreground"/>
                     <div>
                        <span className="font-semibold my-2 block">Simple exchanges</span>
                        <p className="text-muted-foreground">
                           Is the frame not quite right? No worries - we'll exchange your product for a new one.
                        </p>
                     </div>
                  </div>
                  <div>
                     <RefreshCw className="text-muted-foreground"/>
                     <div>
                        <span className="font-semibold my-2 block">Simple exchanges</span>
                        <p className="text-muted-foreground">
                           Just return your product and we'll refund your money. 
                           No questions asked – we'll do our best to make sure your 
                           return is hassle-free. (10 days guarantee)
                        </p>
                     </div>
                  </div>
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
   )
}

export default ProductAccordion
