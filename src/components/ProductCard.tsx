import { retrievePricedProductById } from "@/data"
import { getProductPrice } from "@/lib/util/get-product-price"
import { ProductPreviewType } from "@/types/global"
import { Region } from "@/types/medusa"
import Image from "next/image"
import PriceText from "./PriceText"
import CustomLink from "./CustomLink"

const ProductCard = async ({ product, region }: { product: ProductPreviewType, region: Region }) => {
   const pricedProduct = await retrievePricedProductById({
      id: product.id,
      regionId: region.id,
   }).then((product) => product)
   
   if (!pricedProduct) {
      return null
   }
    
   const { cheapestPrice } = getProductPrice({
      product: pricedProduct,
      region,
   })
   
   
   return (
      <CustomLink href={`/products/${product.handle}`} className="hover:opacity-80">
         <div className="w-full aspect-[4/5] grid place-items-center border border-zinc-100 relative rounded-lg overflow-hidden">
            <Image src={product.thumbnail as string} className="object-cover " alt={product.title} fill priority={false} sizes=""/>
         </div>
         <div className="mt-2 grid w-full">
            <h4 className="text-sm text-zinc-700">{product.title}</h4>
            <span className="text-lg font-medium text-zinc-900">{cheapestPrice && <PriceText price={cheapestPrice}/>}</span>
         </div>
      </CustomLink>
   )
}

export default ProductCard
