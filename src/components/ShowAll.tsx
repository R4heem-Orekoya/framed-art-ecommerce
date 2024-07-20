import { useHits, useSearchBox } from "react-instantsearch"
import CustomLink from "./CustomLink"

const ShowAll = () => {
  const { items } = useHits()
  const { query } = useSearchBox()
  const width = typeof window !== "undefined" ? window.innerWidth : 0

  if (query === "") return null
  if (items.length > 0 && items.length <= 6) return null

   if (items.length === 0) {
      return (
         <div
            className="flex gap-2 justify-center h-fit py-2"
            data-testid="no-search-results-container"
         >
            <p>No results found.</p>
         </div>
      )
   }

   return (
      <div className="flex sm:flex-col small:flex-row gap-2 justify-center items-center h-fit py-4 small:py-2">
         <p>Showing the first {width > 640 ? 6 : 3} results.</p>
         <CustomLink href={`/results/${query}`}>View all</CustomLink>
      </div>
   )
}

export default ShowAll
