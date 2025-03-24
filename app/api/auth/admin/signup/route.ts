import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, adminCode } = body

    // Validate required fields
    if (!name || !email || !password || !adminCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate admin code
    if (adminCode !== process.env.ADMIN_REGISTRATION_CODE) {
      return NextResponse.json(
        { error: 'Invalid admin registration code' },
        { status: 400 }
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

    // Create admin user with null regNumber
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.ADMIN,
        regNumber: null,
        adminAccess: {
          create: {
            isActive: true,
            grantedBy: 'SYSTEM',
            grantedAt: new Date()
          }
        }
      },
      include: {
        adminAccess: true
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('Admin signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create admin account' },
      { status: 500 }
    )
  }
} 