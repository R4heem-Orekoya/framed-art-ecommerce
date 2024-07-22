import { getProductsListWithSort, getRegion } from "@/data"
import { SortOptions } from "@/types/global"
import ProductCard from "./ProductCard"
import { Pagination } from "./Pagination"
import ProductReel from "./ProductReel"

const PRODUCT_LIMIT = 8

type PaginatedProductsParams = {
   limit: number
   collection_id?: string[]
   category_id?: string[]
   id?: string[]
}

interface PaginatedProductsProps {
   sortBy?: SortOptions
   page: number
   collectionId?: string
   categoryId?: string
   productsIds?: string[]
   countryCode: string
}

const PaginatedProducts = async ({ sortBy, page, countryCode, productsIds, collectionId } : PaginatedProductsProps) => {
   const region = await getRegion(countryCode)
   if (!region) {
      return null
   }
   const queryParams: PaginatedProductsParams = {
      limit: PRODUCT_LIMIT,
   }
   
   if (productsIds) {
      queryParams["id"] = productsIds
   }
   
   if (collectionId) {
      queryParams["collection_id"] = [collectionId]
   }
    
   const { response: { products, count } } = await getProductsListWithSort({ page, queryParams, sortBy, countryCode }) 
   const totalPages = Math.ceil(count / PRODUCT_LIMIT)
   return (
      <>
         <ProductReel products={products} region={region}/>
         
         {totalPages > 1 && <Pagination page={page} totalPages={totalPages}/>}
      </>
   )
}

export default PaginatedProducts
