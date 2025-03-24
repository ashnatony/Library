import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: Role.ADMIN,
      },
    })

    // Create admin permission
    await prisma.adminPermission.create({
      data: {
        userId: adminUser.id,
        isActive: true,
        grantedBy: 'system',
      },
    })

    console.log('Admin user created successfully!')
    console.log('Email:', adminUser.email)
    console.log('Password: admin123')
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser() 