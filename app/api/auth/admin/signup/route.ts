import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/jwt'

const prisma = new PrismaClient()

// This should be stored in an environment variable in production
const ADMIN_REGISTRATION_CODE = 'LIBRARY-ADMIN-2024'

export async function POST(request: Request) {
  try {
    const { name, email, password, adminCode } = await request.json()

    if (!name || !email || !password || !adminCode) {
      return NextResponse.json(
        { error: 'Name, email, password, and admin code are required' },
        { status: 400 }
      )
    }

    // Verify admin registration code
    if (adminCode !== ADMIN_REGISTRATION_CODE) {
      return NextResponse.json(
        { error: 'Invalid admin registration code' },
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

    // Create admin user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN'
      }
    })

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role
    })

    return NextResponse.json({ token }, { status: 201 })
  } catch (error) {
    console.error('Error during admin signup:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 