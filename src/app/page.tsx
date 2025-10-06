export default function HomePage() {
  return (
    <div
      // className="min-h-screen flex flex-col justify-center text-center py-20 bg-cover bg-center relative"
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: "url('/images/anime-bg.jpg')" }}
    >
      {/* Overlay gelap agar teks lebih terbaca */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Konten utama */}
      <div className="relative z-10 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-blue-400 drop-shadow-lg">
          AniInfo — Your Anime Encyclopedia
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto text-lg leading-relaxed">
          Discover and explore detailed information about your favorite anime —
          from synopsis, ratings, genres, and characters — powered by the Jikan API.
        </p>
      </div>
    </div>
  )
}
