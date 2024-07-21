import { getProductsListWithSort, getRegion } from "@/data"
import { SortOptions } from "@/types/global"
import ProductCard from "./ProductCard"
import { Pagination } from "./Pagination"

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

const PaginatedProducts = async ({ sortBy, page, countryCode, productsIds } : PaginatedProductsProps) => {
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
    
   const { response: { products, count } } = await getProductsListWithSort({ page, queryParams, sortBy, countryCode }) 
   const totalPages = Math.ceil(count / PRODUCT_LIMIT)
   return (
      <>
         <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) =>  (
               <li key={p.id}>
                  <ProductCard product={p} region={region} />
               </li>
            ))}
         </ul>
         
         {totalPages > 1 && <Pagination page={page} totalPages={totalPages}/>}
      </>
   )
}

export default PaginatedProducts
