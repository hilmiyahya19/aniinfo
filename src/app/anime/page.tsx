import { getAnimeList } from '@/lib/jikan'
import AnimeCard from '@/components/AnimeCard'
import Pagination from '@/components/Pagination'

export default async function AnimeListPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  // Ambil page dari query (default: 1)
  const page = Number(searchParams.page) || 1
  // 🔧 Kirim page ke fungsi fetch
  const animeList = await getAnimeList(page)

  const hasNext = animeList.length === 24 // Asumsi ada next page kalau dapat 24 item

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">Anime List</h1>
      
      {animeList.length === 0 ? (
        <p className="text-gray-400">No anime found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {animeList.map((anime: any) => (
            <AnimeCard
              key={anime.mal_id}
              id={anime.mal_id}
              title={anime.title}
              imageUrl={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || '/fallback.jpg'}
            />
          ))}
        </div>
      )}

      <Pagination page={page} hasNext={hasNext} />
    </div>
  )
}
