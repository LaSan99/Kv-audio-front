import React from 'react'
import { ArrowRightIcon } from 'lucide-react'
export const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
        }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Premium Audio Equipment at Your Fingertips
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Rent professional sound equipment for your event, studio session, or
            production. No commitments, just quality sound when you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium flex items-center justify-center">
              Browse Equipment
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 rounded-md font-medium">
              How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
