import { SortOptions } from "@/types/global"
import { Suspense } from "react"
import SkeletonPlaceholder from "./ProductSkeleton"
import PaginatedProducts from "./PaginatedProducts"

interface AllProductsProps {
   sortBy?: SortOptions
   page?: string
   countryCode: string
   collectionId?: string
}

const ProductsComp = ({ sortBy, page, countryCode, collectionId } : AllProductsProps) => {
   const pageNumber = page ? parseInt(page) : 1
   
   return (
      <div className="mt-8">
         <Suspense fallback={<SkeletonPlaceholder limit={8}/>}>
            <PaginatedProducts
               sortBy={sortBy || "created_at"}
               page={pageNumber}
               countryCode={countryCode}
               collectionId={collectionId}
            />
        </Suspense>
      </div>
   )
}

export default ProductsComp
