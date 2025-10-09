// src/app/layout.tsx
import './globals.css'
import AuthProvider from '@/providers/AuthProvider'; // ← pakai provider baru
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata = {
  title: 'AniInfo',
  description: 'Your Gateway to Anime Information',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen flex flex-col">
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
