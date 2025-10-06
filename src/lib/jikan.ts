// src/lib/jikan.ts
const baseUrl = process.env.NEXT_PUBLIC_JIKAN_API_BASE

export async function getAnimeById(id: string) {
  try {
    const res = await fetch(`${baseUrl}/anime/${id}`, {
      cache: 'no-store', // gunakan cache no-store agar selalu fetch data baru
    })

    if (!res.ok) throw new Error(`Failed to fetch anime: ${res.status}`)

    const data = await res.json()
    return data.data // Jikan API menyimpan hasilnya di field "data"
  } catch (error) {
    console.error('Error fetching anime:', error)
    return null
  }
}

// src/lib/jikan.ts
export async function getAnimeList(page: number = 1) {
  const limit = 24

  try {
      const res = await fetch(`${baseUrl}/anime?page=${page}&limit=${limit}`, {
      cache: 'no-store', // ⬅️ gunakan no-store agar pagination langsung berubah
    })

    if (!res.ok) throw new Error(`Failed to fetch anime list: ${res.status}`)

    const data = await res.json()
    return data.data || []// Jikan API menyimpan hasilnya di field "data"
  } catch (error) {
    console.error('Error fetching anime:', error)
    return []
  }
}

// Cari anime berdasarkan keyword
export async function searchAnime(query: string, page: number = 1) {
  if (!query) return []

  const limit = 24
  try {
    const res = await fetch(`${baseUrl}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`, {
      cache: 'no-store', // selalu fetch terbaru
    })
    if (!res.ok) throw new Error(`Failed to search anime: ${res.status}`)
    const data = await res.json()
    return data.data || []
  } catch (error) {
    console.error('Error searching anime:', error)
    return []
  }
}



