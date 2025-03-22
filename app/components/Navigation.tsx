'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AcademicCapIcon, HomeIcon, InformationCircleIcon, PhoneIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                <AcademicCapIcon className="h-6 w-6 text-primary-600" />
                <div className="ml-3">
                  <div className="text-lg font-bold text-gray-900">Christ College</div>
                  <div className="text-xs text-gray-600">of Engineering</div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <NavLink href="/" icon={<HomeIcon className="h-4 w-4" />} text="Home" />
            <NavLink href="/about" icon={<InformationCircleIcon className="h-4 w-4" />} text="About" />
            <NavLink href="/contact" icon={<PhoneIcon className="h-4 w-4" />} text="Contact" />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="sm:hidden"
        >
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink href="/" icon={<HomeIcon className="h-4 w-4" />} text="Home" />
            <MobileNavLink href="/about" icon={<InformationCircleIcon className="h-4 w-4" />} text="About" />
            <MobileNavLink href="/contact" icon={<PhoneIcon className="h-4 w-4" />} text="Contact" />
          </div>
        </motion.div>
      )}
    </nav>
  )
}

function NavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
      >
        {icon}
        <span>{text}</span>
      </motion.div>
    </Link>
  )
}

function MobileNavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-600 hover:text-primary-600 hover:bg-gray-50"
      >
        {icon}
        <span>{text}</span>
      </motion.div>
    </Link>
  )
} 