'use client'
import { useState } from 'react'
import { sendDataToApi } from '@/lib/api/routeHandlerApi'

export default function TestApi() {
  const [name, setName] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim()) {
      setResult('⚠️ Nama tidak boleh kosong')
      return
    }

    try {
      setLoading(true)
      const data = await sendDataToApi(name)
      setResult(data.message)
    } catch (error) {
      setResult('Terjadi error saat mengirim data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 flex flex-col gap-3 max-w-sm mx-auto">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} // ← ambil value dari input
        placeholder="Masukkan nama"
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 cursor-pointer"
      >
        {loading ? 'Mengirim...' : 'Kirim Data ke API'}
      </button>

      {result && (
        <p className="mt-2 text-gray-800 bg-gray-100 p-2 rounded">
          Response: {result}
        </p>
      )}
    </div>
  )
}
