import { ProductPreviewType } from "@/types/global";
import { Region } from "@/types/medusa";
import ProductCard from "./ProductCard";

interface ProductReelProps {
   products: ProductPreviewType[],
   region: Region
}

const ProductReel = ({ products, region }: ProductReelProps) => {
   return (
      <ul className="grid gap-8 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
         {products.map((product) => (
           <ProductCard product={product} region={region} />
         ))}
      </ul>
   )
}

export default ProductReel
