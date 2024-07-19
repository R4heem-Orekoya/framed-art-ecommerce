import { getProductPrice } from "@/lib/util/get-product-price"
import { cn } from "@/lib/utils"
import { RegionInfo } from "@/types/global"
import { PricedProduct, PricedVariant } from "@medusajs/medusa/dist/types/pricing"

interface ProductPriceProps{
   product: PricedProduct
   variant?: PricedVariant
   region: RegionInfo
}
 
export default function ProductPrice({ product, variant, region } : ProductPriceProps ) {
   const { cheapestPrice, variantPrice } = getProductPrice({
     product,
     variantId: variant?.id,
     region,
   })
 
   const selectedPrice = variant ? variantPrice : cheapestPrice
 
   if (!selectedPrice) {
     return <div className="block w-32 h-9 bg-zinc-100 animate-pulse" />
   }
 
   return (
      <div className="flex flex-col text-lg font-semibold text-primary my-4">
         <span
            className="text-lg"
         >
            {!variant && "From "}
            <span
               data-testid="product-price"
               data-value={selectedPrice.calculated_price_number}
            >
               {selectedPrice.calculated_price}
            </span>
         </span>
         {selectedPrice.price_type === "sale" && (
            <>
               <p>
                  <span className="text-ui-fg-subtle">Original: </span>
                  <span
                     className="line-through"
                     data-testid="original-product-price"
                     data-value={selectedPrice.original_price_number}
                  >
                     {selectedPrice.original_price}
                  </span>
               </p>
               <span className="text-ui-fg-interactive">
                  -{selectedPrice.percentage_diff}%
               </span>
            </>
         )}
      </div>
   )
}
 