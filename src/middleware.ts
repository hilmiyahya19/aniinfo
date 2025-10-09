import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // 🔹 Jika belum login dan menuju dashboard → redirect ke /login
  if (!token && (pathname.startsWith('/dashboard') || pathname.startsWith('/admin'))) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 🔹 Jika SUDAH login dan menuju /login atau /register → redirect ke /dashboard
  if (token && (pathname === '/login' || pathname === '/register')) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/register'],
};
