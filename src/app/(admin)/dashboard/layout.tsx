// src/app/(admin)/dashboard/layout.tsx
export default function DashboardLayout({
  overview,
  anime,
  setting,
}: {
  overview: React.ReactNode
  anime: React.ReactNode
  setting: React.ReactNode
}) {
  return (
    <main
      className="
        min-h-screen p-6 bg-gray-800
        grid gap-6
        lg:grid-cols-3 lg:grid-rows-2
        auto-rows-max
      "
    >
      {/* Overview - kiri atas di layar besar, urutan pertama di layar kecil */}
      <section
        className="
          bg-gray-900 p-6 rounded-2xl shadow-lg
          lg:col-span-2
          order-1
        "
      >
        {overview}
      </section>

      {/* Anime - kanan atas di layar besar, urutan kedua di layar kecil */}
      <section
        className="
          bg-gray-900 p-6 rounded-2xl shadow-lg overflow-y-auto
          lg:row-span-2
          order-2
        "
      >
        {anime}
      </section>

      {/* Settings - bawah kiri di layar besar, urutan ketiga di layar kecil */}
      <section
        className="
          bg-gray-900 p-6 rounded-2xl shadow-lg
          lg:col-span-2
          order-3
        "
      >
        {setting}
      </section>
    </main>
  )
}

