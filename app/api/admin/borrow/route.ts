import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

// Verify admin access
async function verifyAdmin() {
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('admin_session')

  if (!sessionCookie?.value) {
    return false
  }

  const user = await prisma.user.findUnique({
    where: { id: sessionCookie.value },
    include: { adminAccess: true }
  })

  return user?.role === 'ADMIN' && user.adminAccess?.isActive
}

export async function POST(request: Request) {
  try {
    console.log('Starting borrow process...')
    const isAdmin = await verifyAdmin()
    if (!isAdmin) {
      console.log('Unauthorized attempt to borrow')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    console.log('Received borrow request:', body)

    const { userId, bookId, borrowDate, returnDate } = body

    // Validate required fields
    if (!userId || !bookId || !borrowDate || !returnDate) {
      console.log('Missing required fields:', { userId, bookId, borrowDate, returnDate })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if book exists and has available copies
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    })

    if (!book) {
      console.log('Book not found:', bookId)
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    if (book.availableCopies < 1) {
      console.log('Book not available:', bookId, 'Available copies:', book.availableCopies)
      return NextResponse.json(
        { error: 'Book is not available' },
        { status: 400 }
      )
    }

    // Parse dates
    const parsedBorrowDate = new Date(borrowDate)
    const parsedReturnDate = new Date(returnDate)

    console.log('Creating borrowing record with dates:', {
      borrowDate: parsedBorrowDate,
      returnDate: parsedReturnDate
    })

    // Create borrowing record and update book quantity in a transaction
    const [borrowing, updatedBook] = await prisma.$transaction([
      prisma.borrowing.create({
        data: {
          userId,
          bookId,
          borrowDate: parsedBorrowDate,
          dueDate: parsedReturnDate,
          returnDate: null // Initially set to null as the book hasn't been returned yet
        },
        include: {
          book: true,
          user: true
        }
      }),
      prisma.book.update({
        where: { id: bookId },
        data: {
          availableCopies: {
            decrement: 1
          }
        }
      })
    ])

    // Format the response
    const formattedBorrowing = {
      id: borrowing.id,
      bookId: borrowing.book.id,
      userId: borrowing.user.id,
      bookTitle: borrowing.book.title,
      bookAuthor: borrowing.book.author,
      bookIsbn: borrowing.book.isbn,
      userName: borrowing.user.name,
      userEmail: borrowing.user.email,
      borrowDate: borrowing.borrowDate.toISOString(),
      returnDate: borrowing.returnDate?.toISOString() || null,
      isReturned: false,
      isOverdue: false
    }

    console.log('Successfully created borrowing record:', formattedBorrowing)
    return NextResponse.json(formattedBorrowing)
  } catch (error) {
    console.error('Error in borrow endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to borrow book' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 