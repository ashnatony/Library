import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')
    console.log('Session cookie:', sessionCookie?.value)

    if (!sessionCookie?.value) {
      console.error('No session cookie found')
      return NextResponse.json(
        { error: 'Please log in to view your borrowed books' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionCookie.value },
      include: {
        borrowings: {
          where: {
            returnedDate: null
          },
          include: {
            book: true
          }
        }
      }
    })

    console.log('Found user:', user?.id)
    console.log('User borrowings:', user?.borrowings?.length)

    if (!user) {
      console.error('User not found for session:', sessionCookie.value)
      return NextResponse.json(
        { error: 'User session expired. Please log in again.' },
        { status: 401 }
      )
    }

    return NextResponse.json(user.borrowings)
  } catch (error) {
    console.error('Error fetching borrowed books:', error)
    return NextResponse.json(
      { error: 'Failed to fetch borrowed books. Please try again.' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 