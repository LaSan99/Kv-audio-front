import React, { useState } from 'react'
import {
  MenuIcon,
  XIcon,
  ShoppingCartIcon,
  UserIcon,
  SearchIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-indigo-600">
                AudioRent
              </Link>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Home
              </Link>
              <Link
                to="/items"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Equipment
              </Link>
              <Link
                to="/about"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                How It Works
              </Link>
              <Link
                to="/pricing"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
              <SearchIcon className="h-6 w-6" />
            </button>
            <Link to="/profile" className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
              <UserIcon className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
              <ShoppingCartIcon className="h-6 w-6" />
            </Link>
            <Link to="/rent" className="ml-4 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
              Rent Now
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/items"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
            >
              Equipment
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
            >
              How It Works
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
            >
              Contact
            </Link>
            <div className="mt-4 flex items-center justify-between">
              <Link to="/rent" className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                Rent Now
              </Link>
              <div className="flex space-x-4">
                <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
                  <SearchIcon className="h-6 w-6" />
                </button>
                <Link to="/profile" className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
                  <UserIcon className="h-6 w-6" />
                </Link>
                <Link to="/cart" className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
                  <ShoppingCartIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
