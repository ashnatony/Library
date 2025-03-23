'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Book {
  id: string
  title: string
  author: string
  isbn: string
}

interface BorrowedBook extends Book {
  borrowedAt: string
  returnDate: string | null
  isOverdue: boolean
  isReturned: boolean
}

export default function UserDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([])
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...')
        const response = await fetch('/api/auth/user/verify')
        if (!response.ok) {
          throw new Error('Failed to verify user')
        }
        const data = await response.json()
        console.log('Auth response:', data)

        if (!data.isValid) {
          console.log('User not valid, redirecting to login')
          router.push('/user/login')
          return
        }

        setUserName(data.name || '')
        await fetchBorrowedBooks()
      } catch (error) {
        console.error('Auth check error:', error)
        setError('Authentication failed. Please log in again.')
        router.push('/user/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const fetchBorrowedBooks = async () => {
    try {
      console.log('Fetching borrowed books...')
      setLoading(true)
      const response = await fetch('/api/user/borrowed-books')
      console.log('Borrowed books response status:', response.status)
      
      const data = await response.json()
      console.log('Borrowed books response:', data)

      if (!response.ok) {
        if (response.status === 404) {
          setBorrowedBooks([])
          return
        }
        throw new Error(data.error || 'Failed to fetch borrowed books')
      }

      if (Array.isArray(data)) {
        setBorrowedBooks(data)
      } else if (data.error) {
        throw new Error(data.error)
      } else {
        console.error('Unexpected data format:', data)
        throw new Error('Invalid data format received')
      }
    } catch (error) {
      console.error('Error fetching borrowed books:', error)
      setError(error instanceof Error ? error.message : 'Failed to load borrowed books')
    } finally {
      setLoading(false)
    }
  }

  const handleReturnBook = async (bookId: string) => {
    try {
      const response = await fetch('/api/user/return-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to return book')
      }

      // Refresh the books list after returning
      await fetchBorrowedBooks()
    } catch (error) {
      console.error('Error returning book:', error)
      setError(error instanceof Error ? error.message : 'Failed to return book')
    }
  }

  const retryFetch = () => {
    setError(null)
    fetchBorrowedBooks()
  }

  // Separate active and returned books
  const activeBooks = borrowedBooks.filter(book => !book.isReturned)
  const returnedBooks = borrowedBooks.filter(book => book.isReturned)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="text-xl text-white">Loading your books...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl text-center">
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <div className="space-x-4">
            <button 
              onClick={retryFetch}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Try Again
            </button>
            <button 
              onClick={() => router.push('/user/login')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderBooksTable = (books: BorrowedBook[], showReturnButton: boolean = false) => (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrowed Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            {showReturnButton && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{book.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.author}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.isbn}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(book.borrowedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {book.returnDate ? new Date(book.returnDate).toLocaleDateString() : 'Not set'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {book.isOverdue ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Overdue
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    On Time
                  </span>
                )}
              </td>
              {showReturnButton && (
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleReturnBook(book.id)}
                    className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors duration-200"
                  >
                    Return Book
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Welcome, {userName}</h1>
            <button
              onClick={retryFetch}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              Refresh Books
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Currently Borrowed Books</h2>
            {activeBooks.length === 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                <p className="text-gray-700">You haven't borrowed any books yet.</p>
                <p className="text-sm text-gray-500 mt-2">Visit the library to borrow books!</p>
              </div>
            ) : renderBooksTable(activeBooks, true)}
          </div>

          {returnedBooks.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-white">Previously Returned Books</h2>
              {renderBooksTable(returnedBooks)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 