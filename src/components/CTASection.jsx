import React from 'react'
import { ArrowRightIcon } from 'lucide-react'
export const CTASection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Rent Professional Audio Equipment?
              </h2>
              <p className="text-lg text-indigo-100 mb-8">
                Whether you need equipment for a one-day event or a month-long
                production, we have flexible rental options to suit your needs
                and budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-md font-medium flex items-center justify-center">
                  Browse Equipment
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </button>
                <button className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-md font-medium">
                  Contact Us
                </button>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <img
                src="https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Audio equipment"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
