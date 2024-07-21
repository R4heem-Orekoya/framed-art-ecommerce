import { search } from "@/actions/search-actions";
import CustomLink from "@/components/CustomLink";
import PaginatedProducts from "@/components/PaginatedProducts";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SortOptions } from "@/types/global";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Search",
   description: "Explore all of our products.",
}
 
type Params = {
   params: { query: string; countryCode: string }
   searchParams: {
      sortBy?: SortOptions
      page?: string
   }
}


const page = async ({ params, searchParams }: Params) => {
   const { query } = params
   const { sortBy, page } = searchParams
   
   const pageNumber = page ? parseInt(page) : 1
   
   const hits = await search(query).then((data) => data)
   
   const ids = hits.map((h) => h.objectID || h.id).filter((id): id is string => {
     return typeof id === "string"
   })
   
   return (
      <section className="min-h-[calc(100vh-64px)] py-16">
         <div className="flex justify-between items-start">
            <div>
               <h2 className="text-xl md:text-2xl text-muted-foreground">Search Results for:</h2>
               <p className="text-lg font-medium text-primary">{decodeURI(query)} ({ids.length})</p>
            </div>
            <CustomLink className={buttonVariants({variant: "outline"})} href="/products">
               Clear
            </CustomLink>
         </div>
         <Separator className="my-8 bg-zinc-100"/>
         
         {ids.length > 0 ? 
            <div>
               <PaginatedProducts
                  productsIds={ids}
                  sortBy={sortBy}
                  page={pageNumber}
                  countryCode={params.countryCode}
               />
            </div> : <p className="ml-8 small:ml-14 mt-3">No results.</p> 
         }
         
      </section>
   )
}

export default page
