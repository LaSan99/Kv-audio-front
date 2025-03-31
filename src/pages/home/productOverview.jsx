import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";
import { FaShoppingCart, FaRuler, FaTag, FaMoneyBillWave, FaCalculator } from "react-icons/fa";
import Loader from "../../components/Loader";

export default function ProductOverview() {
	const params = useParams();
	const key = params.key;
	const [loadingStatus, setLoadingStatus] = useState("loading");
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
			.then((res) => {
				setProduct(res.data);
				setLoadingStatus("loaded");
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
				setLoadingStatus("error");
			});
	}, [key]);

	const handleAddToCart = () => {
		addToCart(product.key, quantity);
		toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart`);
		console.log(loadCart());
	};

	const incrementQuantity = () => {
		setQuantity(prev => prev + 1);
	};

	const decrementQuantity = () => {
		if (quantity > 1) {
			setQuantity(prev => prev - 1);
		}
	};

	// Calculate total price based on quantity
	const calculateTotal = () => {
		if (!product.price) return 0;
		return (product.price * quantity).toFixed(2);
	};

	return (
		<div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-4">
			{loadingStatus === "loading" && (
				<Loader size="medium" />
			)}
			{loadingStatus === "loaded" && (
				<div className="container mx-auto">
					<div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
						<div className="flex flex-col md:flex-row">
							<div className="w-full md:w-1/2 p-4 md:p-8">
								<div className="rounded-xl overflow-hidden shadow-lg">
									<ImageSlider images={product.image} />
								</div>
							</div>
							<div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
								<div className="mb-6">
									<div className="inline-flex items-center bg-purple-100 px-3 py-1 rounded-full text-purple-600 font-medium mb-4">
										<FaTag className="mr-2" />
										{product.category}
									</div>
									<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
										{product.name}
									</h1>
									<div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"></div>
									<p className="text-gray-600 text-lg leading-relaxed mb-6">
										{product.description}
									</p>
								</div>
								
								<div className="bg-gray-50 rounded-xl p-6 my-6 shadow-inner">
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center text-gray-700">
											<FaMoneyBillWave className="text-green-500 mr-2" />
											<span className="font-medium">Unit Price:</span>
										</div>
										<span className="text-xl font-bold text-green-600">
											Rs. {product.price?.toFixed(2)}
										</span>
									</div>
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center text-gray-700">
											<FaRuler className="text-blue-500 mr-2" />
											<span className="font-medium">Dimensions:</span>
										</div>
										<span className="text-gray-800 font-medium">{product.dimensions}</span>
									</div>
									<div className="border-t border-gray-200 my-4 pt-4">
										<div className="flex items-center justify-between">
											<div className="flex items-center text-gray-700">
												<FaCalculator className="text-purple-500 mr-2" />
												<span className="font-medium">Total Price:</span>
											</div>
											<span className="text-2xl font-bold text-purple-600 transition-all duration-300">
												Rs. {calculateTotal()}
											</span>
										</div>
									</div>
								</div>
								
								<div className="flex items-center mb-6">
									<span className="text-gray-700 font-medium mr-4">Quantity:</span>
									<div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
										<button 
											onClick={decrementQuantity}
											className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
										>
											-
										</button>
										<span className="px-4 py-2 font-medium">{quantity}</span>
										<button 
											onClick={incrementQuantity}
											className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
										>
											+
										</button>
									</div>
								</div>
								
								<button
									className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700
									text-white font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
									flex items-center justify-center space-x-2"
									onClick={handleAddToCart}
								>
									<FaShoppingCart className="text-xl" />
									<span className="text-lg">Add to Cart</span>
								</button>
								
								<div className="mt-6 flex items-center justify-center text-sm text-gray-500">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
									</svg>
									<span>Free shipping on orders over Rs. 1000</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{loadingStatus === "error" && (
				<div className="w-full h-[60vh] flex flex-col justify-center items-center">
					<div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<h1 className="text-2xl font-bold text-gray-800 mb-2">Error Occurred</h1>
						<p className="text-gray-600 mb-6">Unable to load product details. Please try again later.</p>
						<button 
							onClick={() => window.location.reload()}
							className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
						>
							Try Again
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
