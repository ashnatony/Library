import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    // Delete any existing admin users
    await prisma.user.deleteMany({
      where: { role: Role.ADMIN }
    })

    // Create new admin user
    const hashedPassword = await bcrypt.hash('Blessy@cb2005', 10)

    const user = await prisma.user.create({
      data: {
        name: 'Blessy',
        email: 'blessycb60@gmail.com',
        password: hashedPassword,
        role: Role.ADMIN,
        adminAccess: {
          create: {
            isActive: true,
            grantedBy: 'SYSTEM',
            expiresAt: null
          }
        }
      },
      include: {
        adminAccess: true
      }
    })

    return NextResponse.json({
      message: 'Admin account created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        adminAccess: user.adminAccess
      }
    })
  } catch (error) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 