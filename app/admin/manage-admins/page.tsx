'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  adminAccess: {
    isActive: boolean
    grantedBy: string
    grantedAt: string
    expiresAt: string | null
  } | null
}

export default function ManageAdmins() {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [newAdminEmail, setNewAdminEmail] = useState('')

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/list')
      const data = await response.json()
      if (data.error) {
        toast.error(data.error)
        return
      }
      setAdmins(data.admins)
    } catch (error) {
      toast.error('Failed to fetch admin list')
    } finally {
      setLoading(false)
    }
  }

  const handleActivateAdmin = async (email: string) => {
    try {
      const response = await fetch('/api/admin/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (data.error) {
        toast.error(data.error)
        return
      }

      toast.success('Admin access activated successfully')
      fetchAdmins()
    } catch (error) {
      toast.error('Failed to activate admin access')
    }
  }

  const handleDeactivateAdmin = async (email: string) => {
    try {
      const response = await fetch('/api/admin/deactivate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      if (data.error) {
        toast.error(data.error)
        return
      }

      toast.success('Admin access deactivated successfully')
      fetchAdmins()
    } catch (error) {
      toast.error('Failed to deactivate admin access')
    }
  }

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAdminEmail) {
      toast.error('Please enter an email address')
      return
    }

    try {
      const response = await fetch('/api/admin/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newAdminEmail }),
      })

      const data = await response.json()
      if (data.error) {
        toast.error(data.error)
        return
      }

      toast.success('Admin added successfully')
      setNewAdminEmail('')
      fetchAdmins()
    } catch (error) {
      toast.error('Failed to add admin')
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Admin Access</h1>

      <form onSubmit={handleAddAdmin} className="mb-8">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Label htmlFor="email">Add New Admin</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
            />
          </div>
          <Button type="submit">Add Admin</Button>
        </div>
      </form>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Granted By</TableHead>
            <TableHead>Granted At</TableHead>
            <TableHead>Expires At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin) => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  admin.adminAccess?.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {admin.adminAccess?.isActive ? 'Active' : 'Inactive'}
                </span>
              </TableCell>
              <TableCell>{admin.adminAccess?.grantedBy || '-'}</TableCell>
              <TableCell>
                {admin.adminAccess?.grantedAt
                  ? new Date(admin.adminAccess.grantedAt).toLocaleDateString()
                  : '-'}
              </TableCell>
              <TableCell>
                {admin.adminAccess?.expiresAt
                  ? new Date(admin.adminAccess.expiresAt).toLocaleDateString()
                  : 'Never'}
              </TableCell>
              <TableCell>
                {admin.adminAccess?.isActive ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeactivateAdmin(admin.email)}
                  >
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleActivateAdmin(admin.email)}
                  >
                    Activate
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 