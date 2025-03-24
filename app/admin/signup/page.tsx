'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { ShieldCheckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function AdminSignup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    // Validate password strength
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    // Validate password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!passwordRegex.test(formData.password)) {
      toast.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/admin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          adminCode: formData.adminCode
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Admin account created successfully!')
        router.push('/admin/login')
      } else {
        toast.error(data.error || 'Failed to create admin account')
      }
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Failed to create admin account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Toaster position="top-center" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Signup</h1>
          <p className="text-gray-600 mt-2">Create an admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-shadow"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-shadow"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-shadow"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-shadow"
                required
              />
            </div>

            <div>
              <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700">
                Admin Registration Code
              </label>
              <input
                type="text"
                id="adminCode"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-shadow"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/admin/login"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                'Creating Account...'
              ) : (
                <>
                  <ShieldCheckIcon className="h-5 w-5 mr-2" />
                  Create Admin Account
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
} 