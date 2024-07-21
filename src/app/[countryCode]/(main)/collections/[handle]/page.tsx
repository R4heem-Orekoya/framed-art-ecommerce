import ProductsComp from "@/components/ProductsComp";
import SortComponent from "@/components/SortComponent";
import { Separator } from "@/components/ui/separator";
import { getCollectionByHandle, getCollectionsList, listRegions } from "@/data";
import { SortOptions } from "@/types/global";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
   params: { handle: string; countryCode: string }
   searchParams: {
     page?: string
     sortBy?: SortOptions
   }
}

export async function generateStaticParams() {
   const { collections } = await getCollectionsList()
 
   if (!collections) {
     return []
   }
 
   const countryCodes = await listRegions().then((regions) =>
     regions?.map((r) => r.countries.map((c) => c.iso_2)).flat()
   )
 
   const collectionHandles = collections.map((collection) => collection.handle)
 
   const staticParams = countryCodes?.map((countryCode) => 
      collectionHandles.map((handle) => ({ countryCode, handle })
   )).flat()
 
   return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const collection = await getCollectionByHandle(params.handle)
 
   if (!collection) {
     notFound()
   }
 
   const metadata = {
     title: `${collection.title} | Medusa Store`,
     description: `${collection.title} collection`,
   } as Metadata
 
   return metadata
}

const page = async ({ params, searchParams }: Props) => {
   const { sortBy, page } = searchParams

   const collection = await getCollectionByHandle(params.handle).then((collection) => collection)
 
   if (!collection) {
     notFound()
   }
   
   return (
      <section className="py-16 min-h-[calc(100vh-64px)]">
         <div className="flex justify-between items-center gap-4 flex-wrap">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary leading-[1.2]">
               {collection.title}
            </h2>
            
            <SortComponent sortBy={sortBy || "created_at"} />
         </div>
         
         <Separator className="mt-8 mb-4 opacity-50"/>
         
         <ProductsComp
            collectionId={collection.id}
            page={page}
            sortBy={sortBy} 
            countryCode={params.countryCode} 
         />
      </section>
   )
}

export default page
