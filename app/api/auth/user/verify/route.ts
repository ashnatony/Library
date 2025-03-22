import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('user_session')

    if (!sessionCookie?.value) {
      return NextResponse.json(
        { isValid: false, error: 'No session found' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionCookie.value }
    })

    if (!user) {
      return NextResponse.json(
        { isValid: false, error: 'User not found' },
        { status: 401 }
      )
    }

    return NextResponse.json({ isValid: true, user })
  } catch (error) {
    console.error('Error verifying user:', error)
    return NextResponse.json(
      { isValid: false, error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 