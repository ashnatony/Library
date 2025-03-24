'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

export default function Signup() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    regNumber: '',
    password: '',
    confirmPassword: ''
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
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          regNumber: formData.regNumber,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Account created successfully!')
        router.push('/login')
      } else {
        toast.error(data.error || 'Failed to create account')
      }
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Failed to create account')
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
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join our library community</p>
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
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
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
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                required
              />
            </div>

            <div>
              <label htmlFor="regNumber" className="block text-sm font-medium text-gray-700">
                Registration Number
              </label>
              <input
                type="text"
                id="regNumber"
                name="regNumber"
                value={formData.regNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                required
                placeholder="Enter your registration number"
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
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
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
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-medium ${
              isLoading
                ? 'bg-primary-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600'
            } transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Create Account'
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="text-sm"
          >
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Already have an account? Sign in
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 