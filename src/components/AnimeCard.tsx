'use client'

import Image from 'next/image'
import Link from 'next/link'

type AnimeCardProps = {
  id: number
  title: string
  imageUrl: string
}

export default function AnimeCard({ id, title, imageUrl }: AnimeCardProps) {
  return (
    <Link
      href={`/anime/${id}`}
      className="block bg-gray-800 rounded-xl p-3 hover:bg-gray-700 transition"
    >
      <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden mb-3">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <h4 className="font-semibold text-base text-gray-100 line-clamp-2">{title}</h4>
    </Link>
  )
}
