// src/components/Pagination.tsx
'use client'

import Link from "next/link"

export default function Pagination({
  page,
  hasNext,
}: {
  page: number
  hasNext: boolean
}) {

  return (
     <div className="flex justify-center items-center gap-4 mt-10">
      <Link
        href={`?page=${page - 1}`}
        className={`px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition ${
          page <= 1 ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        Previous
      </Link>

      <span className="text-gray-300">Page {page}</span>

      <Link
        href={`?page=${page + 1}`}
        className={`px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition ${
          !hasNext ? 'pointer-events-none opacity-50' : ''
        }`}
      >
        Next
      </Link>
    </div>
  )
}
