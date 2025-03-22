import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { signToken } from '@/lib/jwt'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    console.log('Login attempt for email:', email) // Debug log

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        name: true
      }
    })

    console.log('User found:', user ? { ...user, password: '[HIDDEN]' } : null) // Debug log

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials - User not found' },
        { status: 401 }
      )
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Access denied - Not an admin user' },
        { status: 403 }
      )
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log('Password validation result:', isValidPassword) // Debug log

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials - Wrong password' },
        { status: 401 }
      )
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    })

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    })
  } catch (error) {
    console.error('Error during admin login:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 