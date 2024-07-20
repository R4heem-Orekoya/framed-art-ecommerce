
import { FormEvent } from "react"
import { useRouter } from "next/navigation"

import { X } from "lucide-react"
import SearchBoxWrapper, { ControlledSearchBoxProps } from "./SearchBoxWrapper"
import { Input } from "./ui/input"

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
            <div className="flex items-center justify-between">
               <Input
                  ref={inputRef}
                  data-testid="search-input"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  placeholder={placeholder}
                  spellCheck={false}
                  type="search"
                  value={value}
                  onChange={onChange}
                  className="txt-compact-large h-6 placeholder:text-ui-fg-on-color placeholder:transition-colors focus:outline-none flex-1 bg-transparent "
               />
               {value && (
                  <button
                  onClick={handleReset}
                  type="button"
                  className="items-center justify-center text-ui-fg-on-color focus:outline-none gap-x-2 px-2 txt-compact-large flex"
                  >
                  <X />
                  Cancel
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