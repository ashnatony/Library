import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('Starting borrowed books fetch...')
    const cookieStore = cookies()
    const userSession = cookieStore.get('user_session')
    console.log('User session cookie:', userSession?.value)

    if (!userSession) {
      console.log('No user session found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = userSession.value
    console.log('Fetching books for user:', userId)

    // Fetch all borrowings for the user (both returned and not returned)
    const borrowings = await prisma.borrowing.findMany({
      where: {
        userId: userId
      },
      include: {
        book: true,
        user: true
      },
      orderBy: {
        borrowDate: 'desc'
      }
    })

    console.log('Raw borrowings data:', JSON.stringify(borrowings, null, 2))

    // Transform the data to match the expected format
    const formattedBooks = borrowings
      .filter(borrowing => borrowing.book) // Filter out any borrowings without book data
      .map(borrowing => {
        try {
          const now = new Date()
          const borrowDate = new Date(borrowing.borrowDate)
          const returnDate = borrowing.returnDate ? new Date(borrowing.returnDate) : null
          const dueDate = new Date(borrowDate)
          dueDate.setDate(dueDate.getDate() + 14) // Assuming 14 days borrowing period

          return {
            id: borrowing.id,
            title: borrowing.book.title,
            author: borrowing.book.author,
            isbn: borrowing.book.isbn,
            borrowedAt: borrowing.borrowDate.toISOString(),
            returnDate: returnDate?.toISOString() || null,
            isOverdue: !returnDate && now > dueDate,
            isReturned: returnDate !== null
          }
        } catch (error) {
          console.error('Error formatting book:', error, 'Borrowing:', borrowing)
          return null
        }
      })
      .filter(book => book !== null) // Remove any failed transformations

    console.log('Final formatted books:', JSON.stringify(formattedBooks, null, 2))
    return NextResponse.json(formattedBooks)
  } catch (error) {
    console.error('Error in borrowed books API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch borrowed books' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 