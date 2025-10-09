import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ✅ Ubah nilai ini untuk simulasi login/logout
const IS_LOGGED_IN = true // ubah ke false untuk simulasi belum login

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 🔹 Lindungi hanya route /dashboard (atau /admin/dashboard kalau foldermu di (admin))
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    if (!IS_LOGGED_IN) {
      // Jika belum login → redirect ke /login
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // 🔸 Jika sudah login → lanjut
  return NextResponse.next()
}

// 🔹 Tentukan route yang dipantau middleware
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
