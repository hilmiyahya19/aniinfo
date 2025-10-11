// src/app/(admin)/dashboard/@chart/page.tsx
import dynamic from "next/dynamic";
import { fetchTopAnime } from "@/lib/api/animeApi";

// Client Component (diload secara dinamis)
const AnimeChart = dynamic(() => import("@/components/AnimeChart"));

export default async function ChartPage() {
  const animeData = await fetchTopAnime();

  // Format data untuk chart
  const chartData = animeData.map((anime: any) => ({
    title: anime.title,
    score: anime.score || 0,
  }));

  return (
    <section className="p-6">
      <AnimeChart data={chartData} />
    </section>
  );
}
