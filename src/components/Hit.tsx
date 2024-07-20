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
            className="col-span-1 border flex flex-col p-3 rounded-lg"
            >
            <div className="relative w-full aspect-[4/5]">
               <Image
                  src={hit.thumbnail as string}
                  fill
                  alt={hit.title}
                  className="group object-cover rounded-md"
               />
            </div>
            <div className="flex flex-col justify-between group">
               <div className="flex flex-col">
                  <p className="mt-3 font-medium" data-testid="search-result-title">
                     {hit.title}
                  </p>
               </div>
            </div>
         </div>
      </CustomLink>
   )
}

export default Hit
