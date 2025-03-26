import React, { useState, useEffect } from 'react'
import { StarIcon } from 'lucide-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        console.log('Fetching products from:', `${import.meta.env.VITE_BACKEND_URL}/api/products`)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        console.log('Products response:', response.data)
        
        // Ensure we have an array of products
        if (Array.isArray(response.data)) {
          setProducts(response.data)
          
          // Extract unique categories from products
          const uniqueCategories = ['All']
          response.data.forEach(product => {
            if (product.category && !uniqueCategories.includes(product.category)) {
              uniqueCategories.push(product.category)
            }
          })
          setCategories(uniqueCategories)
        } else {
          console.error('Unexpected response format for products:', response.data)
        }
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Equipment</h2>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Equipment</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular Equipment
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Our most requested audio gear, available for daily, weekly, or
            monthly rental.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id || product.key}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={product.image && product.image.length > 0 ? product.image[0] : 'https://via.placeholder.com/300x200?text=No+Image'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-indigo-600 font-medium mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? 'fill-current' : 'stroke-current fill-none'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                    <Link 
                      to={"/product/" + (product.key)} 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                    >
                      <span>Rent Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No products available in this category.</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-md font-medium">
            View All Equipment
          </button>
        </div>
      </div>
    </section>
  )
}
