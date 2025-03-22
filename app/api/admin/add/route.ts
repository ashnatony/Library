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

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update user to admin role and create admin access
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        role: Role.ADMIN,
        adminAccess: {
          create: {
            isActive: false, // Initially inactive
            grantedBy: currentUser.email,
            expiresAt: null
          }
        }
      },
      include: {
        adminAccess: true
      }
    })

    return NextResponse.json({
      message: 'Admin added successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        adminAccess: updatedUser.adminAccess
      }
    })
  } catch (error) {
    console.error('Error adding admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 