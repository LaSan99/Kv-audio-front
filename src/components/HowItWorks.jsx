import React from 'react'
import { Search, Calendar, Truck, Repeat } from 'lucide-react'
const steps = [
  {
    id: 1,
    title: 'Browse & Select',
    description:
      'Explore our extensive catalog of professional audio equipment and select what you need.',
    icon: Search,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    title: 'Book Your Dates',
    description:
      'Choose your rental period - daily, weekly, or monthly options available to suit your project.',
    icon: Calendar,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 3,
    title: 'Delivery or Pickup',
    description:
      'Get your equipment delivered to your location or pick it up from our store at your convenience.',
    icon: Truck,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 4,
    title: 'Return When Done',
    description:
      'Simply return the equipment when your rental period is over. Easy and hassle-free.',
    icon: Repeat,
    color: 'bg-orange-100 text-orange-600',
  },
]
export const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Renting audio equipment has never been easier. Follow these simple
            steps to get the gear you need.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div
                className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}
              >
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}
