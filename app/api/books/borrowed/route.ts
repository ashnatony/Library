import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

type BorrowingWithRelations = Prisma.BorrowingGetPayload<{
  include: {
    book: {
      select: {
        id: true,
        title: true,
        author: true,
        availableCopies: true
      }
    },
    user: {
      select: {
        id: true,
        regNumber: true
      }
    }
  }
}>

export async function GET(request: Request) {
  try {
    // Get the token from the Authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    // Get all borrowed books for the user
    const borrowings = await prisma.borrowing.findMany({
      where: {
        userId: decoded.userId,
        returnDate: null, // Only get books that haven't been returned
        book: {
          availableCopies: {
            gt: 0 // Only include books that are still available
          }
        }
      },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            availableCopies: true
          }
        },
        user: {
          select: {
            id: true,
            regNumber: true
          }
        }
      },
      orderBy: {
        borrowDate: 'desc'
      }
    }) as BorrowingWithRelations[]

    // Transform the data to match the dashboard interface
    const books = borrowings
      .filter(borrowing => borrowing.book && borrowing.user) // Filter out any borrowings with null relations
      .map((borrowing) => {
        let fine = 0
        if (borrowing.dueDate) {
          const dueDate = new Date(borrowing.dueDate)
          const today = new Date()
          const diffTime = today.getTime() - dueDate.getTime()
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          fine = diffDays > 0 ? diffDays * 1 : 0 // $1 per day if overdue
        }

        return {
          id: borrowing.id,
          title: borrowing.book.title,
          author: borrowing.book.author,
          regNumber: borrowing.user.regNumber,
          borrowedDate: borrowing.borrowDate.toISOString(),
          dueDate: borrowing.dueDate?.toISOString() || null,
          fine
        }
      })

    return NextResponse.json({ books })
  } catch (error) {
    console.error('Error fetching borrowed books:', error)
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
} 