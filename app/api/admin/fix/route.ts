import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    // Find all admin users
    const adminUsers = await prisma.user.findMany({
      where: {
        role: 'ADMIN'
      }
    })

    console.log(`Found ${adminUsers.length} admin users`)

    // Update each admin user
    for (const admin of adminUsers) {
      console.log(`Updating admin user: ${admin.email}`)
      
      // Update the user
      await prisma.user.update({
        where: { id: admin.id },
        data: {
          regNumber: null,
          adminAccess: {
            upsert: {
              create: {
                isActive: true,
                grantedBy: 'system'
              },
              update: {
                isActive: true
              }
            }
          }
        }
      })
    }

    // Verify the changes
    const updatedAdmins = await prisma.user.findMany({
      where: { role: 'ADMIN' },
      include: { adminAccess: true }
    })

    return NextResponse.json({
      message: 'Admin users updated successfully',
      admins: updatedAdmins.map(admin => ({
        email: admin.email,
        role: admin.role,
        adminAccess: admin.adminAccess?.isActive
      }))
    })

  } catch (error) {
    console.error('Error fixing admin users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 