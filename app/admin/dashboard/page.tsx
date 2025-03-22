'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  quantity: number
}

interface User {
  id: string
  name: string
  email: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [showAddBook, setShowAddBook] = useState(false)
  const [showBorrowBook, setShowBorrowBook] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [borrowData, setBorrowData] = useState({
    userId: '',
    bookId: ''
  })
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    quantity: '1'
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/admin/verify')
        const data = await response.json()

        if (!data.isValid) {
          router.push('/admin/login')
        } else {
          fetchBooks()
          fetchUsers()
        }
      } catch (error) {
        console.error('Auth check error:', error)
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/admin/books')
      if (response.ok) {
        const data = await response.json()
        setBooks(data)
      }
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      })

      if (response.ok) {
        setNewBook({ title: '', author: '', isbn: '', quantity: '1' })
        setShowAddBook(false)
        fetchBooks()
      }
    } catch (error) {
      console.error('Error adding book:', error)
    }
  }

  const handleBorrowBook = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(borrowData),
      })

      if (response.ok) {
        setBorrowData({ userId: '', bookId: '' })
        setShowBorrowBook(false)
        setSelectedBook(null)
        fetchBooks()
      }
    } catch (error) {
      console.error('Error borrowing book:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="text-xl text-red-600">
          {error}
          <button 
            onClick={() => router.push('/admin/login')}
            className="ml-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <div className="space-x-4">
              <button
                onClick={() => setShowBorrowBook(!showBorrowBook)}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
              >
                {showBorrowBook ? 'Cancel' : 'Borrow Book'}
              </button>
              <button
                onClick={() => setShowAddBook(!showAddBook)}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
              >
                {showAddBook ? 'Cancel' : 'Add New Book'}
              </button>
            </div>
          </div>

          {showBorrowBook && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Borrow Book</h2>
              <form onSubmit={handleBorrowBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select Book</label>
                  <select
                    value={borrowData.bookId}
                    onChange={(e) => setBorrowData({ ...borrowData, bookId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                    title="Select a book to borrow"
                  >
                    <option value="">Select a book</option>
                    {books.map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.title} - Available: {book.quantity}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Select User</label>
                  <select
                    value={borrowData.userId}
                    onChange={(e) => setBorrowData({ ...borrowData, userId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                    title="Select a user to borrow the book"
                  >
                    <option value="">Select a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
                >
                  Borrow Book
                </button>
              </form>
            </div>
          )}

          {showAddBook && (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Add New Book</h2>
              <form onSubmit={handleAddBook} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                    placeholder="Enter book title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Author</label>
                  <input
                    type="text"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                    placeholder="Enter author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ISBN</label>
                  <input
                    type="text"
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                    placeholder="Enter ISBN"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newBook.quantity}
                    onChange={(e) => setNewBook({ ...newBook, quantity: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    required
                    placeholder="Enter quantity"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
                >
                  Add Book
                </button>
              </form>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Book List</h2>
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.isbn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 