import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // 🔹 Jika belum login dan mengakses halaman yang dilindungi
  if (
    !token &&
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/profile'))
  ) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 🔹 Jika sudah login dan mencoba ke /login atau /register → arahkan ke /dashboard
  if (token && (pathname === '/login' || pathname === '/register')) {
    const dashboardUrl = new URL('/profile', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 🔹 Role-based access control
  if (token) {
    const role = token.role || 'member'; // default member kalau tidak ada field role

    // 🔸 Jika role MEMBER dan mencoba akses /dashboard → tolak
    if (role === 'member' && pathname.startsWith('/dashboard')) {
      const profileUrl = new URL('/profile', request.url);
      return NextResponse.redirect(profileUrl);
    }

    // 🔸 Jika role ADMIN → boleh akses semua (dashboard & profile)
    if (role === 'admin') {
      return NextResponse.next();
    }

    // 🔸 Jika role MEMBER dan mengakses /profile → izinkan
    if (role === 'member' && pathname.startsWith('/profile')) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/login',
    '/register',
  ],
};
