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
    const isAdmin = await verifyAdmin()
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { bookId, userId } = await request.json()

    // Get the book and check availability
    const book = await prisma.book.findUnique({
      where: { id: bookId }
    })

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      )
    }

    if (book.quantity <= 0) {
      return NextResponse.json(
        { error: 'Book is not available' },
        { status: 400 }
      )
    }

    // Create borrowing record and update book quantity
    const [borrowing] = await prisma.$transaction([
      prisma.borrowing.create({
        data: {
          bookId,
          userId,
          borrowDate: new Date(),
          returnDate: null
        }
      }),
      prisma.book.update({
        where: { id: bookId },
        data: {
          quantity: {
            decrement: 1
          }
        }
      })
    ])

    return NextResponse.json(borrowing)
  } catch (error) {
    console.error('Error borrowing book:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 