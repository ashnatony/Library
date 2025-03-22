'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast, { Toaster } from 'react-hot-toast'
import { PlusIcon, BookOpenIcon, ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ReturnBook } from '../../components/ReturnBook'

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  quantity: number
  available: number
  category: string
  description?: string
}

interface BorrowedBook {
  id: string
  bookId: string
  userId: string
  borrowDate: string
  dueDate: string
  returnedDate: string | null
  book: Book
  user: {
    name: string
    email: string
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddBook, setShowAddBook] = useState(false)
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    quantity: 1,
    category: '',
    description: ''
  })

  useEffect(() => {
    fetchBooks()
    fetchBorrowedBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/admin/books', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setBooks(data)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      console.error('Error fetching books:', error)
      toast.error('Failed to fetch books')
    }
  }

  const fetchBorrowedBooks = async () => {
    try {
      const response = await fetch('/api/admin/borrowed-books', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setBorrowedBooks(data)
      }
    } catch (error) {
      console.error('Error fetching borrowed books:', error)
      toast.error('Failed to fetch borrowed books')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...newBook,
          quantity: Number(newBook.quantity),
          available: Number(newBook.quantity)
        })
      })

      if (response.ok) {
        toast.success('Book added successfully')
        setNewBook({
          title: '',
          author: '',
          isbn: '',
          quantity: 1,
          category: '',
          description: ''
        })
        setShowAddBook(false)
        fetchBooks()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to add book')
      }
    } catch (error) {
      console.error('Error adding book:', error)
      toast.error('Failed to add book')
    }
  }

  const calculateDaysOverdue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = Math.abs(today.getTime() - due.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return today > due ? diffDays : 0
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-center" />
      
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-accent-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  localStorage.removeItem('token')
                  router.push('/admin/login')
                }}
                className="text-gray-600 hover:text-accent-600 transition-colors"
              >
                Sign Out
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddBook(!showAddBook)}
            className="flex items-center space-x-2 bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add New Book</span>
          </motion.button>
        </div>

        {showAddBook && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Book</h2>
            <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Enter book title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">ISBN</label>
                <input
                  id="isbn"
                  type="text"
                  name="isbn"
                  placeholder="Enter ISBN"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  name="quantity"
                  min="1"
                  placeholder="Enter quantity"
                  value={newBook.quantity}
                  onChange={(e) => setNewBook({ ...newBook, quantity: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  id="category"
                  type="text"
                  name="category"
                  placeholder="Enter book category"
                  value={newBook.category}
                  onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter book description"
                  value={newBook.description}
                  onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition-colors"
                >
                  Add Book
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Books</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.available}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Borrowed Books</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {borrowedBooks.map((borrowing) => {
                    const daysOverdue = calculateDaysOverdue(borrowing.dueDate)
                    const status = borrowing.returnedDate
                      ? 'Returned'
                      : daysOverdue > 0
                      ? `${daysOverdue} days overdue`
                      : 'Borrowed'
                    
                    return (
                      <tr key={borrowing.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{borrowing.book.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{borrowing.user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(borrowing.dueDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              borrowing.returnedDate
                                ? 'bg-green-100 text-green-800'
                                : daysOverdue > 0
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {status}
                          </span>
                          {!borrowing.returnedDate && (
                            <div className="mt-2">
                              <ReturnBook
                                borrowingId={borrowing.id}
                                onReturn={fetchBorrowedBooks}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 