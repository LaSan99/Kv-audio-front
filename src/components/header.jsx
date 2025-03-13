import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
	const [navPanelOpen, setNavPanelOpen] = useState(false);
	const token = localStorage.getItem("token");

	return (
		<header className="w-full h-[75px] bg-white text-black shadow-lg fixed top-0 z-50 transition-all duration-300">
			<div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative">
				{/* Logo Section */}
				<Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
					<img
						src="/logo.png"
						alt="logo"
						className="w-[55px] h-[55px] object-cover border-2 border-white/30 rounded-full hover:border-white transition-all duration-300 shadow-md"
					/>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-8">
					<Link to="/" className="nav-link">
						Home
					</Link>
					<Link to="/contact" className="nav-link">
						Contact
					</Link>
					<Link to="/gallery" className="nav-link">
						Gallery
					</Link>
					<Link to="/items" className="nav-link">
						Items
					</Link>
				</nav>

				{/* Right Section - Cart & Auth */}
				<div className="hidden md:flex items-center space-x-6">
					<Link
						to="/booking"
						className="flex items-center space-x-2 hover:text-white/80 transition-colors duration-200"
					>
						<FaCartShopping className="text-2xl hover:scale-110 transition-transform" />
					</Link>
					{token && (
						<button
							className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-sm font-medium"
							onClick={() => {
								localStorage.removeItem("token");
								window.location.href = "/login";
							}}
						>
							Logout
						</button>
					)}
				</div>

				{/* Mobile Menu Button */}
				<button
					className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
					onClick={() => setNavPanelOpen(true)}
				>
					<GiHamburgerMenu className="text-2xl" />
				</button>
			</div>

			{/* Mobile Navigation Panel */}
			<MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />

			{/* Add global styles */}
			<style>{`
				.nav-link {
					position: relative;
					font-size: 1.1rem;
					padding: 0.5rem;
					transition: all 0.2s;
				}
				.nav-link::after {
					content: '';
					position: absolute;
					width: 0;
					height: 2px;
					bottom: -2px;
					left: 50%;
					background-color: black;
					transition: all 0.3s ease;
					transform: translateX(-50%);
				}
				.nav-link:hover::after {
					width: 100%;
				}
				.nav-link:hover {
					opacity: 0.9;
				}
			`}</style>
		</header>
	);
}
