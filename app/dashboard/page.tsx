'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import ReturnBook from '../components/ReturnBook'
import Navigation from '../components/Navigation'

interface Book {
  id: string
  title: string
  author: string
  borrowedDate: string
  dueDate: string
  fine: number
}

export default function Dashboard() {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetchBorrowedBooks()
  }, [router])

  const fetchBorrowedBooks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/books/borrowed', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login')
          return
        }
        throw new Error('Failed to fetch books')
      }

      const data = await response.json()
      setBooks(data.books)
    } catch (error) {
      console.error('Error fetching books:', error)
      toast.error('Failed to fetch your borrowed books')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <Navigation />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <Navigation />
      <Toaster position="top-center" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Library Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              localStorage.removeItem('token')
              router.push('/login')
            }}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <span>Sign Out</span>
          </motion.button>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Currently Borrowed Books</h2>
            {books.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <h3 className="text-xl font-medium text-gray-900">No books borrowed yet</h3>
                <p className="text-gray-600 mt-2">Visit the library to borrow books and they will appear here.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.title}</h3>
                      <p className="text-gray-600 mb-4">by {book.author}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-600">
                            Borrowed: {new Date(book.borrowedDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <span className={book.fine > 0 ? 'text-red-600' : 'text-gray-600'}>
                            Due: {new Date(book.dueDate).toLocaleDateString()}
                          </span>
                        </div>

                        {book.fine > 0 && (
                          <div className="flex items-center text-sm text-red-600">
                            <span>Fine: ${book.fine.toFixed(2)}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4">
                        <ReturnBook
                          borrowingId={book.id}
                          token={localStorage.getItem('token') || ''}
                          onReturn={fetchBorrowedBooks}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
} 