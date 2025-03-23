import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const userSession = cookieStore.get('user_session')

    if (!userSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = userSession.value
    const { bookId } = await request.json()

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 })
    }

    // Find the borrowing record
    const borrowing = await prisma.borrowing.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
        returnDate: null
      },
      include: {
        book: true
      }
    })

    if (!borrowing) {
      return NextResponse.json({ error: 'Borrowing record not found' }, { status: 404 })
    }

    // Update the borrowing record and increment the book quantity in a transaction
    const result = await prisma.$transaction([
      // Update the borrowing record with return date
      prisma.borrowing.update({
        where: { id: borrowing.id },
        data: {
          returnDate: new Date()
        }
      }),
      // Increment the book quantity
      prisma.book.update({
        where: { id: bookId },
        data: {
          quantity: {
            increment: 1
          }
        }
      })
    ])

    return NextResponse.json({
      message: 'Book returned successfully',
      data: result
    })

  } catch (error) {
    console.error('Error returning book:', error)
    return NextResponse.json(
      { error: 'Failed to return book' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 