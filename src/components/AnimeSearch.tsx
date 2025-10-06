'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AnimeSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 🔒 encode query
    const encodedQuery = encodeURIComponent(query.trim()) 
    // Reset ke page 1 setiap search baru
    router.push(`/anime?q=${encodedQuery}&page=1`)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search anime..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
      >
        Search
      </button>
    </form>
  )
}
