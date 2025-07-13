import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/register'
  const token = request.cookies.get('auth_token')?.value || ''

  if (path === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/home', request.url))
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/home',
    '/profile/:path*',
    '/messages/:path*',
    '/friend-requests',
    '/notifications',
    '/saved',
    '/settings',
    '/varification'
  ]
}