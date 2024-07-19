"use client"

import { MedusaProvider } from "medusa-react";
import { QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";


const queryClient = new QueryClient()


const MedusaClientProvider = ({ children }: {children: ReactNode}) => {
   return (
      <MedusaProvider
         queryClientProviderProps={{ client: queryClient }}
         baseUrl="http://localhost:9000"
      >
         {children}
      </MedusaProvider>
   )
}

export default MedusaClientProvider