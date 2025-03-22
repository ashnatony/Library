import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find user and their admin access
    const user = await prisma.user.findUnique({
      where: { email },
      include: { adminAccess: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'User is not an admin' },
        { status: 400 }
      )
    }

    // Update admin access
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        adminAccess: {
          upsert: {
            create: {
              isActive: true,
              grantedBy: 'SYSTEM',
              expiresAt: null
            },
            update: {
              isActive: true
            }
          }
        }
      },
      include: {
        adminAccess: true
      }
    })

    return NextResponse.json({
      message: 'Admin access activated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        adminAccess: updatedUser.adminAccess
      }
    })
  } catch (error) {
    console.error('Error activating admin access:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 