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
    const { borrowingId } = await request.json()

    // Start a transaction
    const result = await prisma.$transaction(async (prisma: PrismaClient) => {
      // Find the borrowing record
      const borrowing = await prisma.borrowing.findUnique({
        where: { id: borrowingId },
        include: { book: true }
      })

      if (!borrowing) {
        throw new Error('Borrowing record not found')
      }

      if (borrowing.userId !== decoded.userId) {
        throw new Error('Unauthorized to return this book')
      }

      if (borrowing.returnedDate) {
        throw new Error('Book already returned')
      }

      // Update borrowing record
      const updatedBorrowing = await prisma.borrowing.update({
        where: { id: borrowingId },
        data: {
          returnedDate: new Date()
        },
        include: {
          book: true
        }
      })

      // Update book availability
      await prisma.book.update({
        where: { id: borrowing.bookId },
        data: {
          available: {
            increment: 1
          }
        }
      })

      // Calculate fine if any
      const dueDate = new Date(borrowing.dueDate)
      const returnDate = new Date()
      const diffTime = returnDate.getTime() - dueDate.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const fine = diffDays > 0 ? diffDays * 1 : 0 // $1 per day if overdue

      return {
        borrowing: updatedBorrowing,
        fine
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error returning book:', error)
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 