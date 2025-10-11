// src/app/(admin)/dashboard/layout.tsx
"use client";

export default function DashboardLayout({
  welcome,
  overview,
  anime,
  chart,
}: {
  welcome: React.ReactNode;
  overview: React.ReactNode
  anime: React.ReactNode
  chart: React.ReactNode
}) {

  return (
    <main className="min-h-screen p-6 bg-gray-800 space-y-6">
      {/* Section Welcome */}
      {welcome}

      {/* Grid utama */}
      <div
        className="
          grid gap-6
          lg:grid-cols-3 lg:grid-rows-2
          auto-rows-max
        "
      >
        {/* Overview */}
        <section
          className="
            bg-gray-900 p-6 rounded-2xl shadow-lg
            lg:col-span-2 order-1
          "
        >
          {overview}
        </section>

        {/* Anime */}
        <section
          className="
            bg-gray-900 p-6 rounded-2xl shadow-lg overflow-y-auto
            lg:row-span-2 order-2
          "
        >
          {anime}
        </section>

        {/* Chart */}
        <section
          className="
            bg-gray-900 p-6 rounded-2xl shadow-lg
            lg:col-span-2 order-3
          "
        >
          {chart}
        </section>
      </div>
    </main>
  )
}

