import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyToken } from '@/lib/jwt'

const prisma = new PrismaClient()

// Get all borrowings
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

    const borrowings = await prisma.borrowing.findMany({
      include: {
        book: true,
        user: {
          select: {
            id: true,
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
    console.error('Error fetching borrowings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Update borrowing (mark as returned)
export async function PUT(request: Request) {
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

    const { borrowingId } = await request.json()

    // Get the borrowing record
    const borrowing = await prisma.borrowing.findUnique({
      where: { id: borrowingId },
      include: { book: true }
    })

    if (!borrowing) {
      return NextResponse.json(
        { error: 'Borrowing record not found' },
        { status: 404 }
      )
    }

    // Update borrowing and book availability
    const [updatedBorrowing] = await prisma.$transaction([
      prisma.borrowing.update({
        where: { id: borrowingId },
        data: {
          returnedDate: new Date()
        },
        include: {
          book: true,
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.book.update({
        where: { id: borrowing.bookId },
        data: {
          available: {
            increment: 1
          }
        }
      })
    ])

    return NextResponse.json(updatedBorrowing)
  } catch (error) {
    console.error('Error updating borrowing:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Create new borrowing
export async function POST(request: Request) {
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

    const { userId, bookId, dueDate } = await request.json()

    // Check if book is available
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    if (book.available <= 0) {
      return NextResponse.json(
        { error: 'Book is not available' },
        { status: 400 }
      )
    }

    // Create borrowing and update book availability
    const [borrowing] = await prisma.$transaction([
      prisma.borrowing.create({
        data: {
          userId,
          bookId,
          dueDate: new Date(dueDate)
        },
        include: {
          book: true,
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.book.update({
        where: { id: bookId },
        data: {
          available: {
            decrement: 1
          }
        }
      })
    ])

    return NextResponse.json(borrowing, { status: 201 })
  } catch (error) {
    console.error('Error creating borrowing:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 