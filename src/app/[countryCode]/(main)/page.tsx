import { getCollectionsList, getProductsList, getRegion } from "@/data"
import { ProductCollectionWithPreviews } from "@/types/global"
import { Product } from "@medusajs/medusa"
import { cache, Suspense } from "react"

import SkeletonPlaceholder from '@/components/ProductSkeleton'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/Hero'
import ComboOffer from '@/components/ComboOffer'
import ProductReel from "@/components/ProductReel"
import CustomLink from "@/components/CustomLink"
import Faq from "@/components/Faq"

export const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

const page = async ({ params: { countryCode } } : {params: { countryCode: string }}) => {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  
  return (
    <section className='py-16'>
      <Hero />
      
      <div className='py-20 flex flex-col justify-center'>
        <h2 className='text-center text-2xl max-sm:text-balance sm:text-3xl font-bold max-w-xl mx-auto'>Discover unique frames for your space</h2>

        {
          collections && region ? 
          <Suspense fallback={<SkeletonPlaceholder limit={4}/>}>
            <ProductReel products={collections[1].products.slice(0, 4)} region={region}/>
          </Suspense> :
          <SkeletonPlaceholder limit={4} className="mt-12 mb-8"/>
        }
        
        <CustomLink href="/collections" className={buttonVariants({
          className: "mx-auto mt-12 flex gap-1 group max-sm:text-xs"
        })}>
          Explore collections
          <ArrowRight className='w-4 h-4 -rotate-45 group-hover:rotate-0 transition z-10'/>
        </CustomLink>
      </div>
      
      <ComboOffer />
      <Faq />
    </section>
  )
}

export default page
