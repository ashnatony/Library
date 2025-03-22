import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Get the current user's session
    const cookieStore = cookies()
    const sessionId = cookieStore.get('admin_session')?.value

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify the current user is an admin
    const currentUser = await prisma.user.findUnique({
      where: { id: sessionId },
      include: { adminAccess: true }
    })

    if (!currentUser || currentUser.role !== Role.ADMIN || !currentUser.adminAccess?.isActive) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    // Get all admin users
    const admins = await prisma.user.findMany({
      where: { role: Role.ADMIN },
      include: { adminAccess: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ admins })
  } catch (error) {
    console.error('Error fetching admin list:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 