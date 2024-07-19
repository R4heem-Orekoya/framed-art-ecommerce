import ProductDetail from '@/components/ProductDetail';
import { getProductByHandle, getProductsList, getRegion, listRegions, retrievePricedProductById } from '@/data';
import { Region } from '@medusajs/medusa';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then((regions) =>
    regions?.map((r) => r.countries.map((c) => c.iso_2)).flat()
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params

  const { product } = await getProductByHandle(handle).then((product) => product)

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | Framed Art Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Framed Art Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

const getPricedProductByHandle = async (handle: string, region: Region) => {
  const { product } = await getProductByHandle(handle).then(
    (product) => product
  )

  if (!product || !product.id) {
    return null
  }

  const pricedProduct = await retrievePricedProductById({
    id: product.id,
    regionId: region.id,
  })

  return pricedProduct
}

const page = async ({ params }: Props) => {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getPricedProductByHandle(params.handle, region)

  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductDetail product={pricedProduct} region={region} countryCode={params.countryCode} />
  )
}

export default page
