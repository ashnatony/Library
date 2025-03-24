import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, regNumber } = body

    // Validate required fields
    if (!name || !email || !password || !regNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists by email or registration number
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { regNumber }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or registration number already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create regular user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        regNumber,
        role: Role.USER
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error('User signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create user account' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 