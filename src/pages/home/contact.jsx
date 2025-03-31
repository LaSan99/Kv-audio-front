import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Contact() {
    const [formData, setFormData] = useState({
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth token
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setFormData({ message: '' });
            } else {
                if (response.status === 403) {
                    setStatus('unauthorized');
                } else {
                    setStatus('error');
                }
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-accent mb-4">Contact Us</h1>
                    <p className="text-gray-600 text-lg">Get in touch with us for all your audio equipment needs</p>
                </motion.div>

                {/* Contact Information Grid */}
                <motion.div 
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 gap-8 mb-12"
                >
                    {/* Contact Details */}
                    <motion.div 
                        variants={item}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-lg shadow-lg"
                    >
                        <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                        
                        <div className="space-y-4">
                            <motion.div 
                                whileHover={{ x: 5 }}
                                className="flex items-center"
                            >
                                <FaPhone className="text-accent mr-4 text-xl" />
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-gray-600">+94 77 123 4567</p>
                                </div>
                            </motion.div>

                            <motion.div 
                                whileHover={{ x: 5 }}
                                className="flex items-center"
                            >
                                <FaEnvelope className="text-accent mr-4 text-xl" />
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-gray-600">info@kvaudio.com</p>
                                </div>
                            </motion.div>

                            <motion.div 
                                whileHover={{ x: 5 }}
                                className="flex items-center"
                            >
                                <FaMapMarkerAlt className="text-accent mr-4 text-xl" />
                                <div>
                                    <h3 className="font-semibold">Location</h3>
                                    <p className="text-gray-600">123 Audio Street, Colombo 07</p>
                                </div>
                            </motion.div>

                            <motion.div 
                                whileHover={{ x: 5 }}
                                className="flex items-center"
                            >
                                <FaClock className="text-accent mr-4 text-xl" />
                                <div>
                                    <h3 className="font-semibold">Business Hours</h3>
                                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        variants={item}
                        whileHover={{ y: -5 }}
                        className="bg-white p-8 rounded-lg shadow-lg"
                    >
                        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                        {status === 'unauthorized' ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center"
                            >
                                <p className="text-red-600 mb-4">Please log in to send us a message</p>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link to="/login" className="bg-accent text-black py-2 px-4 rounded-md hover:bg-accent/80 transition duration-300">
                                        Login
                                    </Link>
                                </motion.div>
                            </motion.div>
                        ) : (
                            <motion.form 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit} 
                                className="space-y-4"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <label className="block text-gray-700 mb-2">Message</label>
                                    <textarea 
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-accent focus:border-accent"
                                        rows="4"
                                        placeholder="Your Message"
                                        required
                                    ></textarea>
                                </motion.div>
                                
                                {status === 'success' && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-green-600 text-sm"
                                    >
                                        Message sent successfully!
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-600 text-sm"
                                    >
                                        Failed to send message. Please try again.
                                    </motion.div>
                                )}
                                
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit" 
                                    className="w-full bg-accent text-black py-2 px-4 rounded-md hover:bg-accent/80 transition duration-300 disabled:opacity-50"
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </motion.button>
                            </motion.form>
                        )}
                    </motion.div>
                </motion.div>

                {/* Review Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center"
                >
                    <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
                    <p className="text-gray-600 mb-6">We value your feedback! Leave a review about our services.</p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/review">
                            <button className="bg-accent hover:bg-accent/80 text-black font-bold py-3 px-6 rounded-md inline-flex items-center">
                                <FaStar className="mr-2" />
                                Write a Review
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}