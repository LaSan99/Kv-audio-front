import React, { useState, useEffect } from 'react'
import { Quote } from 'lucide-react'
import axios from 'axios'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        console.log('API URL:', `${import.meta.env.VITE_BACKEND_URL}/api/reviews/approved`)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews/approved`)
        console.log('API Response:', response.data) // Debug log
        
        // Check if the response has the expected structure
        if (response.data && Array.isArray(response.data)) {
          // Direct array response
          setTestimonials(response.data)
        } else if (response.data && response.data.success && Array.isArray(response.data.reviews)) {
          // Success structure with reviews array
          setTestimonials(response.data.reviews)
        } else {
          setTestimonials([])
          console.error('Unexpected response format:', response.data)
        }
      } catch (err) {
        setError('Failed to load testimonials')
        console.error('Error fetching testimonials:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Don't just take our word for it. Here's what professionals and event
            organizers have to say about our rental service.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {Array.isArray(testimonials) && testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <motion.div
                key={testimonial._id}
                variants={item}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-4 left-4 text-indigo-200"
                >
                  <Quote className="h-12 w-12" />
                </motion.div>
                <div className="pt-8">
                  <p className="text-gray-600 mb-6 relative z-10">
                    {testimonial.comment}
                  </p>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={testimonial.profilePicture}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-3 text-center text-gray-500"
            >
              No reviews available yet
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center bg-indigo-600 rounded-lg p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Join Our Satisfied Customers
          </h3>
          <p className="max-w-2xl mx-auto mb-8">
            Experience the convenience and quality of our audio equipment rental
            service for your next event or project.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-md font-medium"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
