// Dapatkan detail anime berdasarkan ID
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

// Dapatkan daftar anime dengan pagination
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

// Cari anime berdasarkan query
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

// Dapatkan daftar top 10 anime
export async function fetchTopAnime() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=10", {
      next: { revalidate: 3600 }, // cache selama 1 jam
    });

    if (!response.ok) {
      throw new Error("Gagal mengambil data dari Jikan API");
    }

    const data = await response.json();
    return data.data; // hasil array daftar anime
  } catch (error) {
    console.error("Error fetchTopAnime:", error);
    return [];
  }
}
