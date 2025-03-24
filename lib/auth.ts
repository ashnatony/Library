import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(name: string, email: string, regNumber: string, password: string) {
  const hashedPassword = await hashPassword(password)
  return prisma.user.create({
    data: {
      name,
      email,
      regNumber,
      password: hashedPassword,
    },
  })
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
} 