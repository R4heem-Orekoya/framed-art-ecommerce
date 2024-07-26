import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'

const MainLayout = ({ children }: { children: ReactNode }) => {
   return (
      <>
         <Navbar />
         <div className="w-[min(1400px,90%)] mx-auto">
            {children} 
         </div>
         <Footer />
      </>
   )
}

export default MainLayout
