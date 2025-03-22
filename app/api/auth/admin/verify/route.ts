import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (!sessionCookie?.value) {
      return NextResponse.json({ isValid: false })
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionCookie.value },
      include: { adminAccess: true }
    })

    if (!user || user.role !== 'ADMIN' || !user.adminAccess?.isActive) {
      return NextResponse.json({ isValid: false })
    }

    return NextResponse.json({ isValid: true })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json({ isValid: false })
  } finally {
    await prisma.$disconnect()
  }
} 