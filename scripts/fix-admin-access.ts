import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixAdminAccess() {
  try {
    // Find admin user
    const adminUser = await prisma.user.findFirst({
      where: {
        email: 'admin@example.com',
        role: 'ADMIN'
      },
      include: {
        adminAccess: true
      }
    })

    if (!adminUser) {
      console.error('Admin user not found')
      return
    }

    console.log('Found admin user:', adminUser.email)

    // Update admin user to set regNumber to null
    await prisma.user.update({
      where: { id: adminUser.id },
      data: { regNumber: null }
    })

    // Check if admin access exists
    if (!adminUser.adminAccess) {
      console.log('Creating admin access...')
      await prisma.adminPermission.create({
        data: {
          userId: adminUser.id,
          isActive: true,
          grantedBy: 'system'
        }
      })
    } else {
      console.log('Updating admin access...')
      await prisma.adminPermission.update({
        where: { userId: adminUser.id },
        data: { isActive: true }
      })
    }

    // Verify the changes
    const verifiedUser = await prisma.user.findUnique({
      where: { id: adminUser.id },
      include: { adminAccess: true }
    })

    console.log('Admin access status:', {
      email: verifiedUser?.email,
      role: verifiedUser?.role,
      regNumber: verifiedUser?.regNumber,
      isActive: verifiedUser?.adminAccess?.isActive
    })

  } catch (error) {
    console.error('Error fixing admin access:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixAdminAccess() 