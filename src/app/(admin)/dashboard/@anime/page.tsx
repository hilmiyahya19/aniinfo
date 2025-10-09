// src/app/(admin)/dashboard/@anime/page.tsx
import Image from "next/image"

export default async function AnimePage() {
  const res = await fetch("https://api.jikan.moe/v4/top/anime", {
    next: { revalidate: 3600 },
  })
  const data = await res.json()
  const animeList = data.data?.slice(0, 6) || []

  interface Anime {
    mal_id: number;
    title: string;
    score: number;
    images: {
        jpg: {
        image_url: string;
        };
    };
    }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-white">Top Anime</h2>
      <div className="grid grid-cols-1 gap-4">
        {animeList.map((anime: Anime) => (
          <div key={anime.mal_id} className="flex gap-4 items-center">
            <div className="relative w-20 h-28 flex-shrink-0">
              <Image
                src={anime.images.jpg.image_url}
                alt={anime.title}
                width={300}        // <--- tambahkan
                height={400}       // <--- tambahkan
                className="object-cover rounded-md"
              />
            </div>
            <div>
              <h3 className="font-semibold text-white">{anime.title}</h3>
              <p className="text-sm text-gray-400">Score: {anime.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
