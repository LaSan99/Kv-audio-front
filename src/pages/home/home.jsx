import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] bg-gradient-to-r from-blue-600 to-indigo-800">
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-5xl font-bold mb-6">Premium Audio Equipment Rentals</h1>
                        <p className="text-xl mb-8">Professional sound gear for events, studios, and performances</p>
                        <Link to="/products" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Browse Equipment
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Our Rentals?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Professional Grade Equipment</h3>
                            <p className="text-gray-600">High-end audio gear maintained to industry standards</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Flexible Rental Periods</h3>
                            <p className="text-gray-600">Daily, weekly, or monthly rentals to suit your needs</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Technical Support</h3>
                            <p className="text-gray-600">Expert assistance for setup and operation</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Equipment Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Popular Equipment</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold">Microphones</h3>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
                                </svg>
                            </div>
                            <h3 className="font-semibold">Speakers</h3>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </div>
                            <h3 className="font-semibold">Mixers</h3>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold">Amplifiers</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Ready to Rent Equipment?</h2>
                    <Link to="/products" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                        View Catalog
                    </Link>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Client Reviews</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <p className="text-gray-600 mb-4">"Top-quality audio equipment. Perfect for our music festival!"</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                                <div className="ml-3">
                                    <h4 className="font-semibold">Alex Turner</h4>
                                    <p className="text-sm text-gray-500">Event Organizer</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <p className="text-gray-600 mb-4">"Great service and professional-grade equipment. Highly recommended!"</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                                <div className="ml-3">
                                    <h4 className="font-semibold">Sarah Chen</h4>
                                    <p className="text-sm text-gray-500">Studio Owner</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <p className="text-gray-600 mb-4">"Excellent support team and flexible rental options."</p>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full"></div>
                                <div className="ml-3">
                                    <h4 className="font-semibold">Mark Wilson</h4>
                                    <p className="text-sm text-gray-500">Sound Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}