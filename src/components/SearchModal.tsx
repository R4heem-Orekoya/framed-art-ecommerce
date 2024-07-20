"use client"

import { SEARCH_INDEX_NAME, searchClient } from "@/lib/search-client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import Hits from "./Hits";
import Hit from "./Hit";
import SearchBox from "./SearchBox";

const SearchModal = () => {
   const router = useRouter()
   const searchRef = useRef(null)
   
   // close modal on outside click
   const handleOutsideClick = (event: MouseEvent) => {
      if (event.target === searchRef.current) {
         router.back()
      }
   }
   
   useEffect(() => {
      window.addEventListener("click", handleOutsideClick)
      // cleanup
      return () => {
        window.removeEventListener("click", handleOutsideClick)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   
   // on escape key press, close modal
   useEffect(() => {
      const handleEsc = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            router.back()
         }
      }
      window.addEventListener("keydown", handleEsc)

      // cleanup
      return () => {
         window.removeEventListener("keydown", handleEsc)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
    
   return (
      <section className="relative z-[75]">
         <div className="fixed inset-0 bg-opacity-75 backdrop-blur-md min-h-screen w-screen" />
         <div className="fixed inset-0" ref={searchRef}>
            <div className="flex flex-col justify-start w-[min(600px,100%)] mx-auto transform p-5 items-center text-left align-middle transition-all bg-transparent shadow-none">
               <InstantSearchNext
                  indexName={SEARCH_INDEX_NAME}
                  searchClient={searchClient}
               >
                  <div
                     className="flex flex-col bg-zinc-50 border border-zinc-100 w-full rounded-lg p-2 sm:p-4"
                     data-testid="search-modal-container"
                  >
                     <div className="w-full flex items-center justify-between gap-x-2 px-2 py-3 sm:px-4 bg-zinc-100 rounded-md border border-zinc-50 focus-within:border-zinc-200">
                        <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5}/>
                        <SearchBox />
                     </div>
                     <div className="flex-1 mt-6">
                        <Hits hitComponent={Hit} />
                     </div>
                  </div>
               </InstantSearchNext>
            </div>
         </div>
      </section>
   )
}

export default SearchModal
