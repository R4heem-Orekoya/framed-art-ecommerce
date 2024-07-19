import { ProductPreviewType } from "@/types/global";
import { Region } from "@/types/medusa";
import ProductCard from "./ProductCard";

interface ProductReelProps {
   products: ProductPreviewType[],
   region: Region
}

const ProductReel = ({ products, region }: ProductReelProps) => {
   // console.log(products);
   
   return (
      <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
         {products.map((product) => (
           <ProductCard product={product} region={region} key={product.id}/>
         ))}
      </div>
   )
}

export default ProductReel
