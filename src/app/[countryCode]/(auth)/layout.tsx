import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="w-[min(1400px,90%)] mx-auto">
        {children} 
      </div>
      <Footer />
    </>
  );
}
