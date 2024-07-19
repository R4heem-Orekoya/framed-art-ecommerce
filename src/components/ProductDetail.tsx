import { getProductPrice } from "@/lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Image from "next/image"
import { notFound } from "next/navigation"
import PriceText from "./PriceText"
import repeat from "@/lib/util/repeat"
import { Star } from "lucide-react"
import ProductActions from "./ProductActions"
import { Suspense } from "react"
import ProductActionsWrapper from "./ProductActionsWrapper"
import ProductAccordion from "./ProductAccordion"
import BreadCrumb from "./BreadCrumb"

interface ProductDetailProps {
   product: PricedProduct
   region: Region
   countryCode: string
}

const ProductDetail = ({ product, region, countryCode}: ProductDetailProps) => {
   if (!product || !product.id) {
      return notFound()
   }
   
   
   return (
      <section className="min-h-[calc(100vh-64px)] py-8">
         <BreadCrumb />
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square relative rounded-lg overflow-hidden border border-zinc-100">
               <Image 
                  src={product.thumbnail as string} 
                  alt={product.handle as string} 
                  fill className="object-cover"
                  sizes=""
                  priority
               />
            </div>
            <div className="aspect-square flex items-center">
               <div className="flex flex-col justify-center flex-1">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">{product.title}</h2>
                  <div className="flex gap-1 items-center my-2">
                     {repeat(4).map((s, i) => (
                        <Star key={i} className="w-4 h-4 text-orange-400 fill-orange-400"/>
                     ))}
                     <Star className="w-4 h-4 text-orange-400"/>
                  </div>
                  
                  <div className="mt-4">
                     <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                     <p className="mt-2 text-sm">{product.description}</p>
                  </div>
                  
                  <Suspense 
                     fallback={<ProductActions disabled={true} product={product} region={region} />}
                  >
                     <ProductActionsWrapper id={product.id} region={region} />
                  </Suspense>
               </div>
            </div>
         </div>
         <div className="mt-16">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">Product Details</h3>
            <ProductAccordion product={product}/>
         </div>
      </section>
   )
}

export default ProductDetail
