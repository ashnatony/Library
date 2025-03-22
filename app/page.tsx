'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navigation from './components/Navigation'
import { BookOpenIcon, UserIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Christ College Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your gateway to knowledge and learning resources. Access thousands of books, journals, and digital materials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* User Access Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="text-primary-600 mb-4">
                <UserIcon className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Access</h2>
              <p className="text-gray-600 mb-6">
                Login to your student account to manage your borrowed books and access library services.
              </p>
              <div className="space-y-3">
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Admin Access Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="text-accent-600 mb-4">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Access</h2>
              <p className="text-gray-600 mb-6">
                Administrative portal for librarians and staff to manage library resources.
              </p>
              <div className="space-y-3">
                <Link href="/admin/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
                  >
                    Admin Login
                  </motion.button>
                </Link>
                <Link href="/admin/signup">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 px-4 bg-white text-accent-600 border-2 border-accent-600 rounded-lg hover:bg-accent-50 transition-colors"
                  >
                    Admin Sign Up
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Library Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <div className="text-primary-600 mb-4">
                <BookOpenIcon className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Library Collection</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">10,000+</h3>
                  <p className="text-gray-600">Books Available</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">50+</h3>
                  <p className="text-gray-600">Journal Subscriptions</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">24/7</h3>
                  <p className="text-gray-600">Digital Access</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Library Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Online Catalog</h3>
              <p className="text-gray-600">Search and browse our entire collection online</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Resources</h3>
              <p className="text-gray-600">Access e-books and online journals</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Spaces</h3>
              <p className="text-gray-600">Quiet areas and group study rooms</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 