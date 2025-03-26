import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Star, Check, Trash2, Calendar, Mail, User } from 'lucide-react'

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      // Add debug console logs
      console.log('Token:', token)
      console.log('API URL:', `${import.meta.env.VITE_BACKEND_URL}/api/reviews`)
      
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      console.log('API Response:', response.data)
      
      // Check the structure of the response
      if (response.data && Array.isArray(response.data)) {
        setReviews(response.data)
      } else if (response.data && response.data.success && Array.isArray(response.data.reviews)) {
        setReviews(response.data.reviews)
      } else {
        console.error('Unexpected response format:', response.data)
        setReviews([])
      }
    } catch (err) {
      console.error('Error fetching reviews:', err)
      setError('Failed to load reviews. ' + (err.response?.data?.message || err.message))
    } finally {
      setLoading(false)
    }
  }

  const handleApproveReview = async (email) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/approve/${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log('Approve response:', response.data)

      if (response.data && response.data.message) {
        toast.success('Review approved successfully')
        // Update the local state
        setReviews(reviews.map(review => 
          review.email === email 
            ? { ...review, isApproved: true } 
            : review
        ))
      }
    } catch (err) {
      console.error('Error approving review:', err)
      toast.error('Failed to approve review: ' + (err.response?.data?.message || err.message))
    }
  }

  const handleDeleteReview = async (email) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      console.log('Delete response:', response.data)

      if (response.data && response.data.message) {
        toast.success('Review deleted successfully')
        // Remove the review from the local state
        setReviews(reviews.filter(review => review.email !== email))
      }
    } catch (err) {
      console.error('Error deleting review:', err)
      toast.error('Failed to delete review: ' + (err.response?.data?.message || err.message))
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Review Management</h1>
        <div className="text-center py-8">
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Review Management</h1>
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Review Management</h1>
      
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No reviews available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => (
            <div 
              key={review._id} 
              className={`border p-4 rounded-lg shadow ${
                review.isApproved ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <img
                    src={review.profilePicture}
                    alt={review.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" /> {review.name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Mail className="h-4 w-4" /> {review.email}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded mb-4">
                <p className="text-gray-700">{review.comment}</p>
              </div>
              
              <div className="flex justify-end space-x-2">
                {!review.isApproved && (
                  <button
                    onClick={() => handleApproveReview(review.email)}
                    className="flex items-center px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <Check className="h-4 w-4 mr-1" /> Approve
                  </button>
                )}
                <button
                  onClick={() => handleDeleteReview(review.email)}
                  className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewManagement
