import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { UserIcon, SearchIcon, XIcon } from "lucide-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const token = localStorage.getItem("token");

	return (
		<header className="bg-white shadow-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					{/* Logo Section */}
					<div className="flex items-center">
						<Link to="/" className="flex-shrink-0 flex items-center space-x-3">
							<img
								src="/logo.png"
								alt="logo"
								className="w-[45px] h-[45px] object-cover rounded-full"
							/>
							<span className="text-2xl font-bold text-indigo-600">AudioRent</span>
						</Link>

						{/* Desktop Navigation */}
						<nav className="hidden md:ml-10 md:flex md:space-x-8">
							<Link to="/" className="text-gray-900 hover:text-indigo-600 px-3 py-2 font-medium">
								Home
							</Link>
							<Link to="/items" className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium">
								Equipment
							</Link>
							<Link to="/gallery" className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium">
								Gallery
							</Link>
							<Link to="/contact" className="text-gray-500 hover:text-indigo-600 px-3 py-2 font-medium">
								Contact
							</Link>
						</nav>
					</div>

					{/* Desktop Right Section */}
					<div className="hidden md:flex items-center space-x-4">
						<button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
							<SearchIcon className="h-6 w-6" />
						</button>
						{token ? (
							<>
								<Link to="/profile" className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
									<UserIcon className="h-6 w-6" />
								</Link>
								<Link to="/booking" className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
									<FaCartShopping className="h-6 w-6" />
								</Link>
								<button
									onClick={() => {
										localStorage.removeItem("token");
										window.location.href = "/login";
									}}
									className="ml-4 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
								>
									Logout
								</button>
							</>
						) : (
							<Link to="/login" className="ml-4 px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
								Login
							</Link>
						)}
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2 rounded-md text-gray-500 hover:text-indigo-600 focus:outline-none"
						>
							{isMenuOpen ? (
								<XIcon className="h-6 w-6" />
							) : (
								<GiHamburgerMenu className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation Panel */}
			{isMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						<Link
							to="/"
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-50"
						>
							Home
						</Link>
						<Link
							to="/items"
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
						>
							Equipment
						</Link>
						<Link
							to="/gallery"
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
						>
							Gallery
						</Link>
						<Link
							to="/contact"
							className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
						>
							Contact
						</Link>
						{token && (
							<Link
								to="/profile"
								className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-indigo-600 hover:bg-gray-50"
							>
								Profile
							</Link>
						)}
						<div className="mt-4 flex items-center justify-between">
							{token ? (
								<>
									<button
										onClick={() => {
											localStorage.removeItem("token");
											window.location.href = "/login";
										}}
										className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
									>
										Logout
									</button>
									<div className="flex space-x-4">
										<button className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
											<SearchIcon className="h-6 w-6" />
										</button>
										<Link to="/profile" className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
											<UserIcon className="h-6 w-6" />
										</Link>
										<Link to="/booking" className="p-1 rounded-full text-gray-500 hover:text-indigo-600 focus:outline-none">
											<FaCartShopping className="h-6 w-6" />
										</Link>
									</div>
								</>
							) : (
								<Link to="/login" className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
									Login
								</Link>
							)}
						</div>
					</div>
				</div>
			)}
		</header>
	);
}
