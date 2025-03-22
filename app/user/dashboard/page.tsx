'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface BorrowedBook {
  id: string
  borrowDate: string
  book: {
    id: string
    title: string
    author: string
    isbn: string
  }
}

export default function UserDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([])
  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...')
        const response = await fetch('/api/auth/user/verify')
        const data = await response.json()
        console.log('Auth response:', data)

        if (!data.isValid) {
          console.error('Auth verification failed:', data.error)
          setError(`Authentication failed: ${data.error}`)
          router.push('/user/login')
          return
        }

        setUserInfo(data.user)
        console.log('User info:', data.user)
        console.log('Auth verified, fetching borrowed books...')
        await fetchBorrowedBooks()
      } catch (error) {
        console.error('Auth check error:', error)
        setError('Failed to verify authentication')
        router.push('/user/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const fetchBorrowedBooks = async () => {
    try {
      console.log('Fetching borrowed books for user:', userInfo?.id)
      const response = await fetch('/api/user/borrowed-books')
      console.log('Borrowed books response status:', response.status)
      
      const data = await response.json()
      console.log('Borrowed books response data:', data)

      if (!response.ok) {
        console.error('Failed to fetch borrowed books:', data.error)
        setError(`Failed to fetch borrowed books: ${data.error}`)
        return
      }

      setBorrowedBooks(data)
    } catch (error) {
      console.error('Error fetching borrowed books:', error)
      setError('Failed to fetch borrowed books')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">
          {error}
          <button 
            onClick={() => router.push('/user/login')}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
            <div className="text-sm text-gray-600">
              Welcome, {userInfo?.name}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">My Borrowed Books</h2>
            {borrowedBooks.length === 0 ? (
              <p className="text-gray-500">You haven't borrowed any books yet.</p>
            ) : (
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrowed Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {borrowedBooks.map((borrowing) => (
                      <tr key={borrowing.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{borrowing.book.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{borrowing.book.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{borrowing.book.isbn}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(borrowing.borrowDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 