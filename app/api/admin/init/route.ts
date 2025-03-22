import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    // Check if any admin exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: Role.ADMIN }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 400 }
      )
    }

    // Create the first admin
    const hashedPassword = await bcrypt.hash('Blessy@cb2005', 10)

    const admin = await prisma.user.create({
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
      message: 'Admin created successfully',
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
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