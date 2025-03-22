import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Check if any admin exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: Role.ADMIN }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'System already has an admin. Please use the regular admin signup process.' },
        { status: 403 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the first super admin
    const user = await prisma.user.create({
      data: {
        name,
        email,
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
      message: 'First super admin created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        adminAccess: user.adminAccess
      }
    })
  } catch (error) {
    console.error('Error creating first super admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 