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
      const url = new URL('/admin/login', request.url)
      url.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // For API routes, let them handle their own authentication
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.next()
    }

    // For all other admin routes, verify the session
    try {
      const response = await fetch(`${request.nextUrl.origin}/api/auth/admin/verify`, {
        headers: {
          Cookie: `admin_session=${sessionCookie.value}`
        }
      })
      const data = await response.json()

      if (!data.isValid) {
        const url = new URL('/admin/login', request.url)
        url.searchParams.set('from', request.nextUrl.pathname)
        return NextResponse.redirect(url)
      }
    } catch (error) {
      console.error('Session verification error:', error)
      const url = new URL('/admin/login', request.url)
      url.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 