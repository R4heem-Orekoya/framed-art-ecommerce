import SearchModal from "@/components/SearchModal"
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
   title: "Serach for a product"
}

const page = () => {
   return (
      <SearchModal />
   )
}

export default page
