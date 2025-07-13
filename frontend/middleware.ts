import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/register' || path === '/home' || path === '/'
  const token = request.cookies.get('auth_token')?.value || ''

  // Redirect authenticated users away from login/register pages
  if ((path === '/login' || path === '/register') && token) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // Handle root path - redirect to home (which is now public)
  if (path === '/') {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // Protected routes that require authentication
  const protectedRoutes = ['/profile', '/messages', '/friend-requests', '/notifications', '/saved', '/settings', '/varification']
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/profile/:path*',
    '/messages/:path*',
    '/friend-requests',
    '/notifications',
    '/saved',
    '/settings',
    '/varification'
  ]
}