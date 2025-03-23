import React from 'react'
import { Quote } from 'lucide-react'
const testimonials = [
  {
    id: 1,
    content:
      'AudioRent made our music festival a success. The quality of their equipment is outstanding, and their team was super helpful with setup and troubleshooting.',
    author: 'Sarah Johnson',
    position: 'Event Organizer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 2,
    content:
      'As a DJ, having access to top-notch equipment without the huge investment has been game-changing. I can try different setups for different venues.',
    author: 'Marcus Chen',
    position: 'Professional DJ',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  },
  {
    id: 3,
    content:
      'Our podcast studio was able to start with professional equipment from day one thanks to AudioRent. The flexible rental terms fit our growing business perfectly.',
    author: 'Emily Rodriguez',
    position: 'Podcast Producer',
    imageUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
  },
]
export const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Don't just take our word for it. Here's what professionals and event
            organizers have to say about our rental service.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
            >
              <div className="absolute top-4 left-4 text-indigo-200">
                <Quote className="h-12 w-12" />
              </div>
              <div className="pt-8">
                <p className="text-gray-600 mb-6 relative z-10">
                  {testimonial.content}
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center bg-indigo-600 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Join Our Satisfied Customers
          </h3>
          <p className="max-w-2xl mx-auto mb-8">
            Experience the convenience and quality of our audio equipment rental
            service for your next event or project.
          </p>
          <button className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 rounded-md font-medium">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  )
}
