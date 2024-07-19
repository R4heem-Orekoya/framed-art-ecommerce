import { ChevronRight } from "lucide-react"
import Link from "next/link"
import CustomLink from "./CustomLink"

const BREADCRUMBS = [
   { id: 1, name: 'Home', href: '/' },
   { id: 2, name: 'Products', href: '/products' },
]

const BreadCrumb = () => {
   return (
      <ol className="flex mb-8">
         {BREADCRUMBS.map((breadcrumb, i) => (
            <li key={breadcrumb.href}>
               <div className='flex items-center text-sm'>
                  <CustomLink
                     href={breadcrumb.href}
                     className='font-medium text-sm text-muted-foreground hover:text-primary'>
                     {breadcrumb.name}
                  </CustomLink>
                  {i !== BREADCRUMBS.length - 1 && (
                     <ChevronRight className="h-4 w-4 text-zinc-400 mx-2 flex-shrink-0"/>
                  )}
               </div>
            </li>
         ))}
      </ol>
   )
}

export default BreadCrumb
