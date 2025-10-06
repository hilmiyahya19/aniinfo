// src/types/anime.ts
export interface Anime {
  mal_id: number
  title: string
  images: {
    jpg: {
      image_url: string
      small_image_url: string
      large_image_url: string
    }
  }
  synopsis?: string
  episodes?: number
  score?: number
  type?: string
  status?: string
  title_japanese?: string
}
