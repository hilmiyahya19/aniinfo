// src/app/anime/@modal/[id]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getAnimeById } from '@/lib/api/animeApi'
import Modal from '@/components/Modal'

interface AnimeDetailPageProps {
  params: {
    id: string
  }
}

/**
 * Halaman detail anime.
 * Mengambil parameter ID dari URL (misalnya /anime/1)
 * dan menampilkan data detail anime berdasarkan ID tersebut.
 */
export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  /**
  * Ambil ID dari parameter URL dinamis [id], 
  * kalo nama foldernya [slug], maka jadi const { slug } = params
  */
  const { id } = params

  // Fetch detail anime berdasarkan ID
  const anime = await getAnimeById(id)

  // Jika data tidak ditemukan, arahkan ke halaman 404
  if (!anime) return notFound()

  return (
   <Modal>
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          width={300}
          height={400}
          className="rounded-xl shadow-md object-cover mx-auto md:mx-0"
        />
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-500 mb-3">{anime.title}</h1>
          <p className="text-gray-400 mb-4 text-sm md:text-base leading-relaxed">{anime.synopsis || 'No synopsis available.'}</p>
          <ul className="space-y-1 text-gray-300 text-sm md:text-base">
            <li><strong>Episodes:</strong> {anime.episodes || '-'}</li>
            <li><strong>Status:</strong> {anime.status}</li>
            <li><strong>Score:</strong> ⭐ {anime.score || 'N/A'}</li>
            <li><strong>Type:</strong> {anime.type}</li>
          </ul>
        </div>
      </div>
    </Modal>
  )
}
