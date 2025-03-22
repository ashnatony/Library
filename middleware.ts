import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only apply to admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip middleware for login and signup pages
    if (request.nextUrl.pathname === '/admin/login' || 
        request.nextUrl.pathname === '/admin/signup') {
      return NextResponse.next()
    }

    // Get the session cookie
    const sessionCookie = request.cookies.get('admin_session')
    
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // For API routes, let them handle their own authentication
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.next()
    }

    // For all other admin routes, redirect to login if no session
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 