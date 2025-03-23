import React, { useState } from 'react'
import {
  MenuIcon,
  XIcon,
  ShoppingCartIcon,
  UserIcon,
  SearchIcon,
} from 'lucide-react'
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-indigo-600">
                AudioRent
              </span>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <a
                href="#"
                className="text-gray-900 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Equipment
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                How It Works
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium"
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
              <SearchIcon className="h-6 w-6" />
            </button>
            <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
              <UserIcon className="h-6 w-6" />
            </button>
            <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
              <ShoppingCartIcon className="h-6 w-6" />
            </button>
            <button className="ml-4 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
              Rent Now
            </button>
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
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-gray-50"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
            >
              Equipment
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
            >
              How It Works
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
            >
              Pricing
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
            >
              Contact
            </a>
            <div className="mt-4 flex items-center justify-between">
              <button className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                Rent Now
              </button>
              <div className="flex space-x-4">
                <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
                  <SearchIcon className="h-6 w-6" />
                </button>
                <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
                  <UserIcon className="h-6 w-6" />
                </button>
                <button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
                  <ShoppingCartIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
