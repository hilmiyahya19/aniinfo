// src/app/anime/series/[id]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAnimeById } from '@/lib/api/animeApi'
import BackButton from '@/components/BackButton'

interface AnimeDetailPageProps {
  params: {
    id: string
  }
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const anime = await getAnimeById(params.id)

  if (!anime) return notFound()

  return (
    <div className="max-w-5xl mx-auto p-6">
      <BackButton />
      <div className="flex flex-col md:flex-row gap-6 mt-6 mb-6">
        <Image
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          width={300}
          height={400}
          className="rounded-xl shadow-md object-cover"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">{anime.title}</h1>
          <p className="text-gray-600 mb-4">{anime.synopsis || 'No synopsis available.'}</p>

          <ul className="space-y-1 text-gray-700">
            <li><strong>Episodes:</strong> {anime.episodes || '-'}</li>
            <li><strong>Status:</strong> {anime.status}</li>
            <li><strong>Score:</strong> ⭐ {anime.score || 'N/A'}</li>
            <li><strong>Type:</strong> {anime.type}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
