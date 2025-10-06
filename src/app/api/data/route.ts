import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const name = body.name || 'Anonymous'
  return NextResponse.json({ message: `Hello, ${name}!` })
}

const data = [
        { 
            id: 1, 
            name: 'Item 1' 
        },
        { 
            id: 2, 
            name: 'Item 2' 
        },
        { 
            id: 3, 
            name: 'Item 3' 
        }
    ]

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
        const detailData = data.find(item => item.id === Number(id));
        if (detailData) {
            return NextResponse.json({
                status: 'success',
                message: 'Data ditemukan',
                data: detailData
            });
        } else {
            return NextResponse.json({
                status: 'error',
                message: 'Data tidak ditemukan',
                data: {}
            });
        }
    }

    // Jika tidak ada id, kembalikan semua data
    return NextResponse.json({
        status: 'success',
        message: 'Gunakan POST untuk kirim data di http://localhost:3000/testapi.',
        data
  })
}
