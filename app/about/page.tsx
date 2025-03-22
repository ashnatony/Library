'use client'

import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import { AcademicCapIcon, BookOpenIcon, UserGroupIcon, BeakerIcon } from '@heroicons/react/24/outline'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Christ College of Engineering</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering future engineers with knowledge, innovation, and values since establishment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Feature
            icon={<AcademicCapIcon className="h-12 w-12" />}
            title="Academic Excellence"
            description="Committed to providing high-quality education with state-of-the-art facilities and experienced faculty."
          />
          <Feature
            icon={<BookOpenIcon className="h-12 w-12" />}
            title="Modern Library"
            description="A vast collection of books, journals, and digital resources to support research and learning."
          />
          <Feature
            icon={<BeakerIcon className="h-12 w-12" />}
            title="Research Focus"
            description="Encouraging innovation through research projects and industry collaborations."
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Vision & Mission</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-2">Vision</h3>
                <p className="text-gray-600">
                  To be a center of excellence in engineering education, fostering innovation, research, and entrepreneurship 
                  for the betterment of society.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary-600 mb-2">Mission</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide quality education through innovative teaching-learning practices</li>
                  <li>Foster research and innovation culture among students and faculty</li>
                  <li>Develop industry-ready professionals with strong ethical values</li>
                  <li>Promote entrepreneurship and industry collaboration</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="text-primary-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
} 