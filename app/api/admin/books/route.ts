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

// Get all books
export async function GET() {
  try {
    const isAdmin = await verifyAdmin()
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Add a new book
export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdmin()
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { 
      title, 
      author, 
      isbn, 
      publisher,
      publishYear,
      category,
      description,
      totalCopies,
      availableCopies,
      location
    } = await request.json()

    const book = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        publisher,
        publishYear: publishYear ? parseInt(publishYear) : null,
        category,
        description,
        totalCopies: totalCopies ? parseInt(totalCopies) : 1,
        availableCopies: availableCopies ? parseInt(availableCopies) : 1,
        location
      }
    })

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error creating book:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Update a book
export async function PUT(request: Request) {
  try {
    const isAdmin = await verifyAdmin()
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id, ...data } = await request.json()

    // Convert numeric fields if they exist
    if (data.publishYear) {
      data.publishYear = parseInt(data.publishYear)
    }
    if (data.totalCopies) {
      data.totalCopies = parseInt(data.totalCopies)
    }
    if (data.availableCopies) {
      data.availableCopies = parseInt(data.availableCopies)
    }

    const book = await prisma.book.update({
      where: { id },
      data,
    })

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error updating book:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// Delete a book
export async function DELETE(request: Request) {
  try {
    const isAdmin = await verifyAdmin()
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await request.json()

    await prisma.book.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 