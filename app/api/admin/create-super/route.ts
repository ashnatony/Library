import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// This should be stored in an environment variable in production
const SUPER_ADMIN_CODE = 'LIBRARY-SUPER-ADMIN-2024'

export async function POST(request: Request) {
  try {
    const { name, email, password, code } = await request.json()

    if (!name || !email || !password || !code) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Verify the special code
    if (code !== SUPER_ADMIN_CODE) {
      return NextResponse.json(
        { error: 'Invalid super admin code' },
        { status: 403 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create super admin user
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
      message: 'Super admin created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        adminAccess: user.adminAccess
      }
    })
  } catch (error) {
    console.error('Error creating super admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 