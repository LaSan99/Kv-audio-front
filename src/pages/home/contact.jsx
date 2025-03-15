import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";

export default function Contact() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-accent mb-4">Contact Us</h1>
                    <p className="text-gray-600 text-lg">Get in touch with us for all your audio equipment needs</p>
                </div>

                {/* Contact Information Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Details */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FaPhone className="text-accent mr-4 text-xl" />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-600">+94 77 123 4567</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaEnvelope className="text-accent mr-4 text-xl" />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-gray-600">info@kvaudio.com</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-accent mr-4 text-xl" />
                                <div>
                                    <h3 className="font-semibold">Location</h3>
                                    <p className="text-gray-600">123 Audio Street, Colombo 07</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <FaClock className="text-accent mr-4 text-xl" />
                                <div>
                                    <h3 className="font-semibold">Business Hours</h3>
                                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Name</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                                    placeholder="Your Email"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2">Message</label>
                                <textarea 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                                    rows="4"
                                    placeholder="Your Message"
                                ></textarea>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-accent text-black py-2 px-4 rounded-md hover:bg-accent/80 transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

                {/* Review Section */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
                    <p className="text-gray-600 mb-6">We value your feedback! Leave a review about our services.</p>
                    <Link to="/review">
                        <button className="bg-accent hover:bg-accent/80 text-black font-bold py-3 px-6 rounded-md inline-flex items-center">
                            <FaStar className="mr-2" />
                            Write a Review
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}