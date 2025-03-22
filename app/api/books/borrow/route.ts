import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    // Get the token from the Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    // Get request body
    const { bookId, dueDate } = await request.json()

    // Check if book exists and is available
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    })

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    if (book.available < 1) {
      return NextResponse.json({ error: 'Book is not available' }, { status: 400 })
    }

    // Start a transaction
    const borrowing = await prisma.$transaction(async (prisma) => {
      // Create borrowing record
      const borrowing = await prisma.borrowing.create({
        data: {
          userId: decoded.userId,
          bookId: bookId,
          dueDate: new Date(dueDate),
        },
        include: {
          book: true
        }
      })

      // Update book availability
      await prisma.book.update({
        where: { id: bookId },
        data: {
          available: {
            decrement: 1
          }
        }
      })

      return borrowing
    })

    return NextResponse.json(borrowing, { status: 201 })
  } catch (error) {
    console.error('Error borrowing book:', error)
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 