import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="w-full px-4 md:px-8 lg:px-16 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-[2000px] mx-auto">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">KV Audio</h3>
                        <p className="text-sm">Professional audio equipment rentals for all your sound needs.</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="hover:text-white"><FaFacebook /></a>
                            <a href="#" className="hover:text-white"><FaTwitter /></a>
                            <a href="#" className="hover:text-white"><FaInstagram /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white">Home</Link></li>
                            <li><Link to="/products" className="hover:text-white">Products</Link></li>
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <FaPhone className="mr-2" />
                                <span>+94 77 123 4567</span>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-2" />
                                <span>info@kvaudio.com</span>
                            </li>
                            <li className="flex items-center">
                                <FaMapMarkerAlt className="mr-2" />
                                <span>123 Audio Street, Colombo</span>
                            </li>
                        </ul>
                    </div>

                    {/* Business Hours */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-4">Business Hours</h3>
                        <ul className="space-y-2">
                            <li>Monday - Friday: 9AM - 6PM</li>
                            <li>Saturday: 10AM - 4PM</li>
                            <li>Sunday: Closed</li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} KV Audio. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;