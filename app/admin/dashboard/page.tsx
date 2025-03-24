'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  totalCopies: number
  availableCopies: number
}

interface User {
  id: string
  name: string
  email: string
}

interface BorrowedBook {
  id: string
  bookId: string
  userId: string
  bookTitle: string
  bookAuthor: string
  bookIsbn: string
  userName: string
  userEmail: string
  borrowDate: string
  returnDate: string | null
  isReturned: boolean
  isOverdue: boolean
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [books, setBooks] = useState<Book[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([])
  const [showAddBook, setShowAddBook] = useState(false)
  const [showBorrowBook, setShowBorrowBook] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [borrowData, setBorrowData] = useState({
    userId: '',
    bookId: '',
    borrowDate: new Date().toISOString().split('T')[0],
    returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  })
  const [returnData, setReturnData] = useState({
    borrowingId: ''
  })
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    totalCopies: 1,
    availableCopies: 1
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
          fetchBorrowedBooks()
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

  const fetchBorrowedBooks = async () => {
    try {
      console.log('Fetching borrowed books...')
      const response = await fetch('/api/admin/borrowed-books')
      console.log('Borrowed books API response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Borrowed books data received:', data)
        setBorrowedBooks(data)
        console.log('Borrowed books state updated:', data.length, 'books')
      } else {
        const errorData = await response.json()
        console.error('Error response from borrowed books API:', errorData)
      }
    } catch (error) {
      console.error('Error fetching borrowed books:', error)
    }
  }

  // Add an interval to refresh borrowed books every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchBorrowedBooks, 30000)
    return () => clearInterval(interval)
  }, [])

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
        setNewBook({ title: '', author: '', isbn: '', totalCopies: 1, availableCopies: 1 })
        setShowAddBook(false)
        fetchBooks()
      }
    } catch (error) {
      console.error('Error adding book:', error)
    }
  }

  // Add this function to get available books
  const getAvailableBooks = () => {
    return books.filter(book => book.availableCopies > 0);
  };

  // Add this function to handle borrow data changes
  const handleBorrowDataChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setBorrowData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBorrowBook = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log('Submitting borrow request:', borrowData)
      const response = await fetch('/api/admin/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...borrowData,
          borrowDate: new Date(borrowData.borrowDate).toISOString(),
          returnDate: new Date(borrowData.returnDate).toISOString()
        }),
      })

      console.log('Borrow response status:', response.status)
      if (response.ok) {
        setBorrowData({
          userId: '',
          bookId: '',
          borrowDate: new Date().toISOString().split('T')[0],
          returnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        })
        setShowBorrowBook(false)
        // Refresh both books and borrowed books lists
        await Promise.all([fetchBooks(), fetchBorrowedBooks()])
        console.log('Successfully refreshed data after borrowing')
      } else {
        const errorData = await response.json()
        console.error('Error response from borrow API:', errorData)
      }
    } catch (error) {
      console.error('Error borrowing book:', error)
    }
  }

  const handleReturnBook = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/return', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnData),
      })

      if (response.ok) {
        setReturnData({ borrowingId: '' })
        fetchBorrowedBooks()
      } else {
        const errorData = await response.json()
        console.error('Error response from return API:', errorData)
      }
    } catch (error) {
      console.error('Error returning book:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-accent-900 to-gray-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-accent-900 to-gray-900 flex items-center justify-center">
        <div className="text-xl text-red-600">
          {error}
          <button 
            onClick={() => router.push('/admin/login')}
            className="ml-4 bg-accent-500 text-white px-4 py-2 rounded hover:bg-accent-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-accent-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => router.push('/admin/login')}
              className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Book</h2>
              <form onSubmit={handleAddBook} className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="ISBN"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Total Copies"
                  value={newBook.totalCopies}
                  onChange={(e) => setNewBook({ ...newBook, totalCopies: parseInt(e.target.value), availableCopies: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
                >
                  Add Book
                </button>
              </form>
            </div>

            <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Borrow Book</h2>
              <button
                onClick={() => setShowBorrowBook(true)}
                className="w-full px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
              >
                Borrow Book
              </button>
            </div>

            <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Return Book</h2>
              <form onSubmit={handleReturnBook} className="space-y-4">
                <input
                  type="text"
                  placeholder="Borrowing ID"
                  value={returnData.borrowingId}
                  onChange={(e) => setReturnData({ ...returnData, borrowingId: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors"
                >
                  Return Book
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Book List</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Copies</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Copies</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.author}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.isbn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.totalCopies}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.availableCopies}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showBorrowBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Borrow Book</h2>
            <form onSubmit={handleBorrowBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">User</label>
                <select
                  name="userId"
                  value={borrowData.userId}
                  onChange={handleBorrowDataChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  required
                >
                  <option value="">Select a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Book</label>
                <select
                  name="bookId"
                  value={borrowData.bookId}
                  onChange={handleBorrowDataChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  required
                >
                  <option value="">Select a book</option>
                  {getAvailableBooks().map(book => (
                    <option key={book.id} value={book.id}>
                      {book.title} by {book.author} (Available: {book.availableCopies}/{book.totalCopies})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Borrow Date</label>
                <input
                  type="date"
                  name="borrowDate"
                  value={borrowData.borrowDate}
                  onChange={handleBorrowDataChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={borrowData.returnDate}
                  onChange={handleBorrowDataChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowBorrowBook(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-accent-600 rounded-md hover:bg-accent-700"
                >
                  Borrow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 