import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function POST(request: Request) {
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

    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if user exists and is an admin
    const targetUser = await prisma.user.findUnique({
      where: { email },
      include: { adminAccess: true }
    })

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (targetUser.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: 'User is not an admin' },
        { status: 400 }
      )
    }

    // Deactivate admin access
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        adminAccess: {
          update: {
            isActive: false
          }
        }
      },
      include: {
        adminAccess: true
      }
    })

    return NextResponse.json({
      message: 'Admin access deactivated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        adminAccess: updatedUser.adminAccess
      }
    })
  } catch (error) {
    console.error('Error deactivating admin access:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 