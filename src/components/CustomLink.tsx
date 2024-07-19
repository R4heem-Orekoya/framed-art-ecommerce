"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ReactNode } from "react"

interface CustomLinkProps {
   children: ReactNode
   href: string,
   className?: string
   onClick?: () => void
   passHref?: true
   [x: string]: any
}

const CustomLink = ({ children, href, ...props } : CustomLinkProps ) => {
   const { countryCode } = useParams()
   
   return (
      <Link href={`/${countryCode}${href}`} {...props}>
         {children}
      </Link>
   )
}

export default CustomLink
