import React, { useState } from 'react'
import { StarIcon } from 'lucide-react'
const products = [
  {
    id: 1,
    name: 'Shure SM7B Microphone',
    category: 'Microphones',
    price: 25,
    rating: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1567787609897-efa3625d8527?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  },
  {
    id: 2,
    name: 'Pioneer DJ DDJ-800 Controller',
    category: 'DJ Equipment',
    price: 60,
    rating: 4.5,
    imageUrl:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 3,
    name: 'JBL EON615 Powered Speaker',
    category: 'PA Systems',
    price: 45,
    rating: 4.8,
    imageUrl:
      'https://images.unsplash.com/photo-1558662413-1984c1d612f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
  },
  {
    id: 4,
    name: 'Yamaha HS8 Studio Monitors (Pair)',
    category: 'Studio Monitors',
    price: 35,
    rating: 4.7,
    imageUrl:
      'https://images.unsplash.com/photo-1545464333-9cbd1f263aa0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
]
export const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = [
    'All',
    'Microphones',
    'DJ Equipment',
    'PA Systems',
    'Studio Monitors',
  ]
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory)
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
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={product.imageUrl}
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
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500">/day</span>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium">
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-md font-medium">
            View All Equipment
          </button>
        </div>
      </div>
    </section>
  )
}
