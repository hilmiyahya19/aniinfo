// src/app/(admin)/layout.tsx
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="min-h-screen bg-gray-700 text-white">
      {children}
    </section>
  )
}
