"use client"

import { SEARCH_INDEX_NAME, searchClient } from "@/lib/search-client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { InstantSearch } from 'react-instantsearch';
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
   
   // disable scroll on body when modal is open
   // useEffect(() => {
   //    document.body.style.overflow = "hidden"
   //    return () => {
   //       document.body.style.overflow = "unset"
   //    }
   // }, [])
   
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
         <div className="fixed inset-0 bg-opacity-75 backdrop-blur-md opacity-100 min-h-screen overflow-y-auto w-screen" />
         <div className="fixed inset-0 px-5 sm:p-0" ref={searchRef}>
            <div className="flex flex-col justify-start w-full transform p-5 items-center text-left align-middle transition-all bg-transparent shadow-none">
               <InstantSearch
                  indexName={SEARCH_INDEX_NAME}
                  searchClient={searchClient}
               >
                  <div
                  className="flex absolute flex-col w-full sm:w-fit"
                  data-testid="search-modal-container"
                  >
                     <div className="w-full flex items-center gap-x-2 p-4 bg-[rgba(3,7,18,0.5)] text-ui-fg-on-color backdrop-blur-2xl rounded-rounded">
                        <Search className="w-4 h-4 text-muted-foreground"/>
                        <SearchBox />
                     </div>
                     <div className="flex-1 mt-6">
                        <Hits hitComponent={Hit} />
                     </div>
                  </div>
               </InstantSearch>
            </div>
         </div>
      </section>
   )
}

export default SearchModal
