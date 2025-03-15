import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaCalendarAlt, FaSearch, FaBox, FaClock, FaDollarSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeOrder, setActiveOrder] = useState(null);
	const [modalOpened, setModalOpened] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOrders, setFilteredOrders] = useState([]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/orders/`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setOrders(res.data);
				setFilteredOrders(res.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
				toast.error("Failed to load orders");
			} finally {
				setLoading(false);
			}
		};
		if (loading) {
			fetchOrders();
		}
	}, [loading]);

	useEffect(() => {
		const results = orders.filter(order =>
			order.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.email?.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredOrders(results);
	}, [searchTerm, orders]);

	function handleOrderStatusChange(orderId, status) {
		toast.promise(
			axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
				{ status },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			),
			{
				loading: `${status === 'approved' ? 'Approving' : 'Rejecting'} order...`,
				success: `Order ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
				error: 'Failed to update order status'
			}
		).then(() => {
			setModalOpened(false);
			setLoading(true);
		});
	}

	const getStatusBadgeClass = (status) => {
		switch (status?.toLowerCase()) {
			case 'approved':
				return 'bg-green-100 text-green-700';
			case 'rejected':
				return 'bg-red-100 text-red-700';
			default:
				return 'bg-yellow-100 text-yellow-700';
		}
	};

	return (
		<div className="p-6 max-w-[1400px] mx-auto">
			<div className="mb-8">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
					<div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2 w-[300px]">
						<FaSearch className="text-gray-400 mr-2" />
						<input
							type="text"
							placeholder="Search orders..."
							className="w-full outline-none text-gray-700"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>
			</div>

			{loading ? (
				<div className="w-full h-64 flex flex-col items-center justify-center">
					<div className="w-16 h-16 border-4 border-purple-500 border-t-transparent animate-spin rounded-full"></div>
					<p className="mt-4 text-gray-600 font-medium animate-pulse">Loading orders...</p>
				</div>
			) : (
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
								<tr>
									<th className="px-6 py-4 text-left">Order ID</th>
									<th className="px-6 py-4 text-left">Email</th>
									<th className="px-6 py-4 text-left">Days</th>
									<th className="px-6 py-4 text-left">Starting Date</th>
									<th className="px-6 py-4 text-left">Ending Date</th>
									<th className="px-6 py-4 text-left">Total Amount</th>
									<th className="px-6 py-4 text-left">Status</th>
									<th className="px-6 py-4 text-left">Order Date</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{filteredOrders.map((order) => (
									<tr
										key={order._id}
										onClick={() => {
											setActiveOrder(order);
											setModalOpened(true);
										}}
										className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
									>
										<td className="px-6 py-4 font-medium text-gray-900">{order.orderId}</td>
										<td className="px-6 py-4 text-gray-600">{order.email}</td>
										<td className="px-6 py-4">
											<div className="flex items-center text-gray-600">
												<FaClock className="mr-2" />
												{order.days} days
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center text-gray-600">
												<FaCalendarAlt className="mr-2" />
												{new Date(order.startingDate).toLocaleDateString()}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center text-gray-600">
												<FaCalendarAlt className="mr-2" />
												{new Date(order.endingDate).toLocaleDateString()}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center text-green-600 font-medium">
												{order.totalAmount.toFixed(2)}
											</div>
										</td>
										<td className="px-6 py-4">
											<span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(order.status)}`}>
												{order.status || 'Pending'}
											</span>
										</td>
										<td className="px-6 py-4 text-gray-600">
											{new Date(order.orderDate).toLocaleDateString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{filteredOrders.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							<FaBox className="mx-auto text-4xl mb-2 text-gray-400" />
							<p>No orders found matching your search criteria</p>
						</div>
					)}
				</div>
			)}

			{modalOpened && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
					<div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
						<div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
							<h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
							<button
								onClick={() => setModalOpened(false)}
								className="text-gray-400 hover:text-red-500 transition-colors"
							>
								<IoMdCloseCircleOutline className="text-3xl" />
							</button>
						</div>

						<div className="p-6">
							<div className="grid grid-cols-2 gap-4 mb-6">
								<div>
									<p className="text-sm text-gray-500">Order ID</p>
									<p className="font-medium">{activeOrder.orderId}</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">Email</p>
									<p className="font-medium">{activeOrder.email}</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">Duration</p>
									<p className="font-medium">{activeOrder.days} days</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">Total Amount</p>
									<p className="font-medium text-green-600">{activeOrder.totalAmount.toFixed(2)}</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">Starting Date</p>
									<p className="font-medium">{new Date(activeOrder.startingDate).toLocaleDateString()}</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">Ending Date</p>
									<p className="font-medium">{new Date(activeOrder.endingDate).toLocaleDateString()}</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">Status</p>
									<p className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-1 ${getStatusBadgeClass(activeOrder.status)}`}>
										{activeOrder.status || 'Pending'}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">Order Date</p>
									<p className="font-medium">{new Date(activeOrder.orderDate).toLocaleDateString()}</p>
								</div>
							</div>

							<div className="border-t border-gray-200 pt-6">
								<h3 className="text-lg font-semibold mb-4">Ordered Items</h3>
								<div className="bg-gray-50 rounded-lg overflow-hidden">
									<table className="min-w-full">
										<thead className="bg-gray-100">
											<tr>
												<th className="px-4 py-2 text-left">Product</th>
												<th className="px-4 py-2 text-center">Quantity</th>
												<th className="px-4 py-2 text-right">Price</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200">
											{activeOrder.orderedItems.map((item) => (
												<tr key={item.product.key} className="hover:bg-gray-50">
													<td className="px-4 py-2">
														<div className="flex items-center">
															<img
																src={item.product.image}
																alt={item.product.name}
																className="w-10 h-10 rounded object-cover mr-3"
															/>
															<span className="font-medium">{item.product.name}</span>
														</div>
													</td>
													<td className="px-4 py-2 text-center">{item.quantity}</td>
													<td className="px-4 py-2 text-right">{item.product.price}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							<div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
								<button
									onClick={() => handleOrderStatusChange(activeOrder.orderId, "approved")}
									className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
								>
									<FaCheckCircle />
									<span>Approve Order</span>
								</button>
								<button
									onClick={() => handleOrderStatusChange(activeOrder.orderId, "rejected")}
									className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
								>
									<FaTimesCircle />
									<span>Reject Order</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
