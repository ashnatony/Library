import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export function middleware(request: NextRequest) {
  // Get token from header
  const token = request.headers.get('authorization')?.split(' ')[1]

  // Check if path requires authentication
  const isAuthPath = request.nextUrl.pathname.startsWith('/api/protected')
  const isAdminPath = request.nextUrl.pathname.startsWith('/api/admin')

  if (!isAuthPath && !isAdminPath) {
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Check admin access
    if (isAdminPath && (decoded as any).role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}

export const config = {
  matcher: ['/api/protected/:path*', '/api/admin/:path*'],
} 