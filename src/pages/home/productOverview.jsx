import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
	const params = useParams();
	const key = params.key;
	const [loadingStatus, setLoadingStatus] = useState("loading");
	const [product, setProduct] = useState({});

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
	}, []);
	return (
		<div className="w-full min-h-screen bg-gray-50 py-8">
			{loadingStatus == "loading" && (
				<div className="w-full h-[60vh] flex justify-center items-center">
					<div className="w-16 h-16 border-4 border-accent border-t-transparent animate-spin rounded-full"></div>
				</div>
			)}
			{loadingStatus == "loaded" && (
				<div className="container mx-auto px-4">
					<div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
						<div className="flex flex-col md:flex-row md:space-x-8 items-start">
							<div className="w-full md:w-1/2 mb-6 md:mb-0">
								<ImageSlider images={product.image} />
							</div>
							<div className="w-full md:w-1/2 flex flex-col">
								<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
									{product.name}
								</h1>
								<div className="inline-block bg-accent/10 px-3 py-1 rounded-full text-accent font-medium mb-4">
									{product.category}
								</div>
								<p className="text-gray-600 text-lg leading-relaxed mb-6">
									{product.description}
								</p>
								<div className="border-t border-b border-gray-200 py-4 my-6">
									<div className="flex items-center justify-between mb-4">
										<span className="text-gray-600 font-medium">Price:</span>
										<span className="text-2xl font-bold text-green-600">
											Rs. {product.price.toFixed(2)}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<span className="text-gray-600 font-medium">Dimensions:</span>
										<span className="text-gray-800">{product.dimensions}</span>
									</div>
								</div>
								<button
									className="w-full md:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600
									text-black font-medium rounded-lg transition-colors duration-200 
									flex items-center justify-center space-x-2"
									onClick={() => {
										addToCart(product.key, 1);
										toast.success("Added to Cart");
										console.log(loadCart());
									}}
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
										<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
										<path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
									</svg>
									<span>Add to Cart</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{loadingStatus == "error" && (
				<div className="w-full h-[60vh] flex flex-col justify-center items-center">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					<h1 className="text-2xl font-bold text-gray-800 mb-2">Error Occurred</h1>
					<p className="text-gray-600">Unable to load product details. Please try again later.</p>
				</div>
			)}
		</div>
	);
}
