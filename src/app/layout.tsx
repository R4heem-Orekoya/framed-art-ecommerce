import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import MedusaClientProvider from "@/components/MedusaProvider";
import { Toaster } from 'sonner'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Framed Art ",
  description: "Shop exclusive collections of framed art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MedusaClientProvider>
        <body className="overflow-x-hidden font-Poppins">
          <Navbar />
          <main className="w-[min(1400px,90%)] mx-auto">
            {children} 
          </main>
          <Toaster position="top-center" richColors style={{
            fontFamily: "Raleway"
          }}/>
          <Footer />
        </body>
      </MedusaClientProvider>
    </html>
  );
}
