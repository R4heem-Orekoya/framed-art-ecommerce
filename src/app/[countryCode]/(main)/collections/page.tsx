import { Separator } from "@/components/ui/separator"
import { getRegion } from "@/data"
import CollectionRail from "@/components/CollectionRail"
import { Metadata } from "next"
import { getCollectionsWithProducts } from "../page"

export const metadata: Metadata = {
   title: "Collections",
   description: "Exclusive collections of framed arts.",
}

const page = async ({ params: { countryCode } } : { params: { countryCode: string }}) => {
   const collections = await getCollectionsWithProducts(countryCode)
   const region = await getRegion(countryCode)
   
   if (!collections || !region) {
      return null
   }
   
   return (
      <section className="py-16 min-h-[calc(100vh-64px)]">
         <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary leading-[1.2]">
               Explore exclusive collections of curated framed arts.
            </h2>
            <p className="mt-4 text-muted-foreground max-sm:text-sm">
               Our selection caters to every taste, transforming 
               any room into a personal sanctuary brimming with 
               beauty and inspiration.
            </p>
         </div>
         <Separator className="opacity-50 my-8"/>
         
         <CollectionRail collections={collections} region={region}/>
      </section>
   )
}

export default page
