import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'sonner'
import { ReactLenis } from '@/lib/lenis'

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
      <body className="overflow-x-hidden font-Poppins">
        <ReactLenis root>
          <main>
            {children} 
          </main>
          <Toaster position="top-center" richColors style={{
            fontFamily: "Raleway"
          }}/>
        </ReactLenis>
      </body>
    </html>
  );
}
