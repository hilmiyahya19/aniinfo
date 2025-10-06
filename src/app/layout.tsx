'use client';

import './globals.css'
// import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { usePathname } from 'next/navigation'
import ClientNavbar from '@/components/ClientNavbar';

// export const metadata = {
//   title: 'AniInfo',
//   description: 'Your Gateway to Anime Information',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname();
  const showNavbarFooter = pathname !== '/login' && pathname !== '/register'; // jika path bukan /login dan bukan /register

  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen flex flex-col">
        {/* {showNavbarFooter && <Navbar />} */}
        {showNavbarFooter && <ClientNavbar />}
        {/* <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main> */}
        <main className="flex-grow">
          {children}
        </main>
        {showNavbarFooter && <Footer />}
      </body>
    </html>
  )
}
