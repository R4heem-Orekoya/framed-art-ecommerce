import { ProductCollectionWithPreviews } from "@/types/global"
import CustomLink from "./CustomLink"
import { Region } from "@medusajs/medusa"
import { ArrowRight } from "lucide-react"
import ProductReel from "./ProductReel"

interface CollectionRailProps {
   collections: ProductCollectionWithPreviews[]
   region: Region
}

const CollectionRail = ({ collections, region } : CollectionRailProps) => {
   return (
      <ul className="grid gap-16">
         {collections.map((collection) => (
            <li key={collection.id}>
               <div className="flex justify-between items-center flex-wrap gap-4">
                  <h3 className="text-lg sm:text-xl font-medium text-zinc-800">{collection.title}</h3>
                  <CustomLink className="text-sm text-muted-foreground font-medium flex items-center gap-1 group" href={`/collections/${collection.handle}`}>
                     Veiw all
                     <ArrowRight className='w-4 h-4 -rotate-45 group-hover:rotate-0 transition z-10'/>
                  </CustomLink>
               </div>
               
               <ProductReel products={collection.products.splice(0, 4)} region={region} />
            </li> 
         ))}
      </ul>
   )
}

export default CollectionRail
