
import { FormEvent } from "react"
import { useRouter } from "next/navigation"

import { X } from "lucide-react"
import SearchBoxWrapper, { ControlledSearchBoxProps } from "./wrappers/SearchBoxWrapper"
import { Button } from "./ui/button"

const ControlledSearchBox = ({ inputRef, onChange, onReset, onSubmit, placeholder, value, ...props }: ControlledSearchBoxProps) => {
   const handleSubmit = (event: FormEvent) => {
      event.preventDefault()
      event.stopPropagation()

      if (onSubmit) {
         onSubmit(event)
      }

      if (inputRef.current) {
         inputRef.current.blur()
      }
   }

   const handleReset = (event: FormEvent) => {
      event.preventDefault()
      event.stopPropagation()

      onReset(event)

      if (inputRef.current) {
         inputRef.current.focus()
      }
   }

   return (
      <div {...props} className="w-full">
         <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
            <div className="flex flex-1 flex-shrink items-center justify-between">
               <input
                  ref={inputRef}
                  data-testid="search-input"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  placeholder={placeholder}
                  spellCheck={false}
                  value={value}
                  onChange={onChange}
                  className="h-4 sm:h-6 sm:ml-2 placeholder:transition-colors focus:outline-none flex-1 bg-transparent "
               />
               {value && (
                  <button onClick={handleReset} type="button"
                  >
                     <X className="w-5 h-5 text-muted-foreground hover:text-primary duration-300"/>
                  </button>
               )}
            </div>
         </form>
      </div>
   )
   }

   const SearchBox = () => {
   const router = useRouter()

   return (
      <SearchBoxWrapper>
         {(props) => {
            return (
               <>
                  <ControlledSearchBox {...props} />
               </>
            )
         }}
      </SearchBoxWrapper>
   )
}

export default SearchBox
