import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaSearch, FaBox, FaPlus, FaTags, FaRuler, FaDollarSign } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminItemsPage() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredItems, setFilteredItems] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setItems(response.data);
				setFilteredItems(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				toast.error("Failed to load items");
				setLoading(false);
			}
		};

		if (loading) {
			fetchItems();
		}
	}, [loading]);

	useEffect(() => {
		const results = items.filter(item =>
			item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.key?.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredItems(results);
	}, [searchTerm, items]);

	const handleDelete = (key) => {
		toast.promise(
			(async () => {
				if (window.confirm("Are you sure you want to delete this item?")) {
					const token = localStorage.getItem("token");
					await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`, {
						headers: { Authorization: `Bearer ${token}` },
					});
					setItems(items.filter((item) => item.key !== key));
					return "Item deleted successfully";
				}
				throw new Error("Deletion cancelled");
			})(),
			{
				loading: 'Deleting item...',
				success: 'Item deleted successfully',
				error: (err) => err.message === "Deletion cancelled" ? "Deletion cancelled" : "Failed to delete item"
			}
		);
	};

	return (
		<div className="p-6 max-w-[1400px] mx-auto">
			<div className="mb-8">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
					<Link
						to="/admin/items/add"
						className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
					>
						<FaPlus />
						<span>Add New Product</span>
					</Link>
				</div>

				<div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2 w-full max-w-md">
					<FaSearch className="text-gray-400 mr-2" />
					<input
						type="text"
						placeholder="Search products..."
						className="w-full outline-none text-gray-700"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{loading ? (
				<div className="w-full h-64 flex flex-col items-center justify-center">
					<div className="w-16 h-16 border-4 border-purple-500 border-t-transparent animate-spin rounded-full"></div>
					<p className="mt-4 text-gray-600 font-medium animate-pulse">Loading products...</p>
				</div>
			) : (
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
								<tr>
									<th className="px-6 py-4 text-left">Key</th>
									<th className="px-6 py-4 text-left">Name</th>
									<th className="px-6 py-4 text-left">Price</th>
									<th className="px-6 py-4 text-left">Category</th>
									<th className="px-6 py-4 text-left">Dimensions</th>
									<th className="px-6 py-4 text-left">Status</th>
									<th className="px-6 py-4 text-center">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{filteredItems.map((product) => (
									<tr key={product.key} className="hover:bg-gray-50 transition-colors duration-200">
										<td className="px-6 py-4 font-medium text-gray-900">
											<div className="flex items-center">
												<FaBox className="text-gray-400 mr-2" />
												{product.key}
											</div>
										</td>
										<td className="px-6 py-4 text-gray-900">{product.name}</td>
										<td className="px-6 py-4">
											<div className="flex items-center text-green-600 font-medium">
												<FaDollarSign className="mr-1" />
												{product.price.toFixed(2)}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center">
												<FaTags className="text-purple-500 mr-2" />
												<span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
													{product.category}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center text-gray-600">
												<FaRuler className="text-blue-500 mr-2" />
												{product.dimensions}
											</div>
										</td>
										<td className="px-6 py-4">
											<span className={`px-3 py-1 rounded-full text-sm font-medium ${
												product.availability
													? "bg-green-100 text-green-700"
													: "bg-red-100 text-red-700"
											}`}>
												{product.availability ? "Available" : "Out of Stock"}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center justify-center gap-2">
												<button
													onClick={() => navigate(`/admin/items/edit`, { state: product })}
													className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
												>
													<FaEdit />
													<span>Edit</span>
												</button>
												<button
													onClick={() => handleDelete(product.key)}
													className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
												>
													<FaTrashAlt />
													<span>Delete</span>
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{filteredItems.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							<FaBox className="mx-auto text-4xl mb-2 text-gray-400" />
							<p>No products found matching your search criteria</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
