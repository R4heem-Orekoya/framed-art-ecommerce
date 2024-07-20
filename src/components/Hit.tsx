import { ProductVariant } from "@medusajs/medusa"
import CustomLink from "./CustomLink"
import Image from "next/image"

export type ProductHit = {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: ProductVariant[]
  collection_handle: string | null
  collection_id: string | null
}

type HitProps = {
  hit: ProductHit
}

const Hit = ({ hit }: HitProps) => {
   return (
      <CustomLink
         href={`/products/${hit.handle}`}
         data-testid="search-result"
      >
         <div
            key={hit.id}
            className="border border-zinc-200/60 hover:bg-zinc-100 flex items-center gap-3 p-2 sm:p-3 rounded-lg"
            >
            <div className="relative w-16 sm:w-24 aspect-square flex-shrink-0">
               <Image
                  src={hit.thumbnail as string}
                  fill
                  alt={hit.title}
                  className="group object-cover rounded-md border border-zinc-100"
               />
            </div>
            <div className="flex flex-col justify-between group">
               <div className="flex flex-col sm:gap-2">
                  <p className="text-sm sm:text-xl font-semibold text-zinc-800" data-testid="search-result-title">
                     {hit.title}
                  </p>
                  <p className="text-[10px] sm:text-xs line-clamp-2 text-muted-foreground" data-testid="search-result-title">
                     {hit.description}
                  </p>
               </div>
            </div>
         </div>
      </CustomLink>
   )
}

export default Hit
