import ProductsComp from "@/components/ProductsComp"
import SortComponent from "@/components/SortComponent"
import { Separator } from "@/components/ui/separator"
import { SortOptions } from "@/types/global"


type Params = {
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
  params: {
    countryCode: string
  }
}

const page = ({ searchParams, params }: Params) => {
  const { sortBy, page } = searchParams
  
  return (
    <section className="min-h-[calc(100vh-64px)] py-16">
      <div className="text-center">
        <h2 className="text-primary font-semibold text-xl md:text-2xl lg:text-3xl">All Products</h2>
        <p className="mt-4 text-muted-foreground">Thoughtfully designed framed art for your home and workspace.</p>
      </div>
      <Separator className="mt-8 mb-4 opacity-50"/>
      <div className="flex justify-end">
        <SortComponent sortBy={sortBy || "created_at"} />
      </div>
      
      <ProductsComp 
        sortBy={sortBy}
        page={page}
        countryCode={params.countryCode}
      />
    </section>
  )
}

export default page
