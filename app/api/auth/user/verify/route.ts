import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const cookieStore = cookies()
    const userSession = cookieStore.get('user_session')
    
    if (!userSession?.value) {
      return NextResponse.json({ isValid: false })
    }

    const user = await prisma.user.findUnique({
      where: { id: userSession.value }
    })

    if (!user) {
      return NextResponse.json({ isValid: false })
    }

    return NextResponse.json({
      isValid: true,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    console.error('Error verifying user:', error)
    return NextResponse.json({ isValid: false })
  } finally {
    await prisma.$disconnect()
  }
} 