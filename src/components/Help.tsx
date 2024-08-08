import CustomLink from "./CustomLink"

const Help = () => {
   return (
      <div className="py-6">
         <h5 className="text-lg md:text-xl font-medium">Need help?</h5>
         <ul className="gap-y-2 flex flex-col mt-4 text-sm text-muted-foreground">
            <li>
               <CustomLink href="/contact">Contact</CustomLink>
            </li>
            <li>
               <CustomLink href="/contact">
                  Returns & Exchanges
               </CustomLink>
            </li>
         </ul>
      </div>
   )
}

export default Help
