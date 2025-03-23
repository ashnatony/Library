import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    console.log('Starting borrowed books fetch...')
    const cookieStore = cookies()
    const adminSession = cookieStore.get('admin_session')
    console.log('Admin session:', adminSession?.value ? 'Found' : 'Not found')

    if (!adminSession) {
      console.log('No admin session found, returning unauthorized')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all borrowings with book and user details
    console.log('Fetching borrowings from database...')
    const borrowings = await prisma.borrowing.findMany({
      include: {
        book: true,
        user: true
      },
      orderBy: [
        { returnDate: 'asc' },
        { borrowDate: 'desc' }
      ]
    })

    console.log('Raw borrowings data:', JSON.stringify(borrowings, null, 2))

    // Transform the data to include overdue status
    const formattedBorrowings = borrowings.map(borrowing => {
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
        bookId: borrowing.book.id,
        userId: borrowing.user.id,
        userName: borrowing.user.name,
        userEmail: borrowing.user.email,
        borrowedAt: borrowing.borrowDate.toISOString(),
        returnDate: returnDate?.toISOString() || null,
        isReturned: returnDate !== null,
        isOverdue: !returnDate && now > dueDate
      }
    })

    console.log('Formatted borrowings:', JSON.stringify(formattedBorrowings, null, 2))
    return NextResponse.json(formattedBorrowings)
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