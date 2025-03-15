import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div className="min-h-screen w-full">
            {/* Hero Section */}
            <section className="relative h-[80vh] bg-gradient-to-r from-blue-600 to-indigo-800 w-full">
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative w-full px-4 h-full flex items-center">
                    <div className="max-w-2xl text-white ml-8 md:ml-16 lg:ml-24">
                        <h1 className="text-5xl font-bold mb-6">Premium Audio Equipment Rentals</h1>
                        <p className="text-xl mb-8">Professional sound gear for events, studios, and performances</p>
                        <Link to="/products" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                            Browse Equipment
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50 w-full">
                <div className="w-full px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Our Rentals?</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-[2000px] mx-auto">
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
            <section className="py-16 bg-white w-full">
                <div className="w-full px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Popular Equipment</h2>
                    <div className="grid md:grid-cols-4 gap-6 max-w-[2000px] mx-auto">
                        {/* Equipment cards remain the same */}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-blue-600 w-full">
                <div className="w-full px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-white mb-8">Ready to Rent Equipment?</h2>
                    <Link to="/products" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                        View Catalog
                    </Link>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-gray-50 w-full">
                <div className="w-full px-4 md:px-8 lg:px-16">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Client Reviews</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[2000px] mx-auto">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold">JD</span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold">John Doe</h4>
                                    <p className="text-gray-500">Event Organizer</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"Outstanding equipment quality and service. The team was incredibly helpful with setup and technical support. Will definitely rent again!"</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold">SM</span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold">Sarah Mitchell</h4>
                                    <p className="text-gray-500">Studio Owner</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"The rental process was smooth and the equipment was in perfect condition. Their flexible rental periods really helped with our project timeline."</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold">RJ</span>
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold">Robert Johnson</h4>
                                    <p className="text-gray-500">Sound Engineer</p>
                                </div>
                            </div>
                            <p className="text-gray-600">"Top-notch professional equipment that meets industry standards. The technical support team was knowledgeable and always available when needed."</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}