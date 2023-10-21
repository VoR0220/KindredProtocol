// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
import Navbar from "@/components/navbar"

export default function Template({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* <Header/> */}
      <main className="flex flex-col min-h-screen items-center">
        {children}
      </main>
      <Navbar />
      {/* <Footer/> */}
    </>
  )
}