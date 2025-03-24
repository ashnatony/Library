import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ReturnBookProps {
  borrowingId: string
  token: string
  onReturn: () => void
}

export function ReturnBook({ borrowingId, token, onReturn }: ReturnBookProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleReturn = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/borrowings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ borrowingId })
      })

      if (response.ok) {
        toast.success('Book returned successfully')
        onReturn()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to return book')
      }
    } catch (error) {
      console.error('Error returning book:', error)
      toast.error('Failed to return book')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleReturn}
      disabled={isLoading}
      variant="outline"
      size="sm"
    >
      {isLoading ? 'Returning...' : 'Return Book'}
    </Button>
  )
} 