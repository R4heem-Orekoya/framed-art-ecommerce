import {
  UseHitsProps,
  useHits,
  useSearchBox,
} from "react-instantsearch"
import { cn } from "@/lib/utils"
import ShowAll from "./ShowAll"
import { ProductHit } from "./Hit"
import { ScrollArea } from "./ui/scroll-area"

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
            "transition-[height,max-height,opacity] duration-300 ease-in-out w-full",
            className,
            {
               "max-h-full opacity-100": !!query,
               "max-h-0 opacity-0": !query && !items.length,
            }
         )}
      >
         <ScrollArea>
            <div className="grid gap-4 max-h-[75vh]" data-testid="search-results">
               {items.slice(0, 6).map((item, index) => (
                  <li
                     key={index}
                     className={cn("list-none", {
                        "sm:hidden": index > 3,
                     })}
                  >
                     <Hit hit={item as unknown as ProductHit} />
                  </li>
               ))}
            </div>
         </ScrollArea>
         <ShowAll />
      </div>
   )
}

export default Hits
