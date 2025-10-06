export async function sendDataToApi(name: string) {
  const res = await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })

  if (!res.ok) {
    throw new Error('Gagal mengirim data ke API')
  }

  return res.json() // hasilnya { message: "Hello, <nama>!" }
}
