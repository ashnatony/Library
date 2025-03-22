import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/jwt'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1]
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decoded = verifyToken(token)
    if (!decoded || (decoded as any).role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Fetch all borrowings with book and user details
    const borrowings = await prisma.borrowing.findMany({
      include: {
        book: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        borrowDate: 'desc'
      }
    })

    return NextResponse.json(borrowings)
  } catch (error) {
    console.error('Error fetching borrowed books:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 