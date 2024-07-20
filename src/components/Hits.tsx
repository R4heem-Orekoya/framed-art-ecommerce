import {
  UseHitsProps,
  useHits,
  useSearchBox,
} from "react-instantsearch"
import { cn } from "@/lib/utils"
import ShowAll from "./ShowAll"
import { ProductHit } from "./Hit"

type HitsProps<THit> = React.ComponentProps<"div"> &
  UseHitsProps & {
    hitComponent: (props: { hit: THit }) => JSX.Element
  }

const Hits = ({
  hitComponent: Hit,
  className,
  ...props
}: HitsProps<ProductHit>) => {
  const { query } = useSearchBox()
  const { items } = useHits(props)

   return (
      <div
         className={cn(
         "transition-[height,max-height,opacity] duration-300 ease-in-out sm:overflow-hidden w-full sm:w-[800px] mb-1 p-px",
         className,
         {
            "max-h-full opacity-100": !!query,
            "max-h-0 opacity-0": !query && !items.length,
         }
         )}
      >
         <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4"
            data-testid="search-results"
         >
            {items.slice(0, 6).map((item, index) => (
               <li
                  key={index}
                  className={cn("list-none", {
                     "hidden sm:block": index > 2,
                  })}
               >
                  <Hit hit={item as unknown as ProductHit} />
               </li>
            ))}
         </div>
         <ShowAll />
      </div>
   )
}

export default Hits
