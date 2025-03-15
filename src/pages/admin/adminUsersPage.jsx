import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserShield, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredUsers, setFilteredUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/users/all`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setUsers(res.data);
				setFilteredUsers(res.data);
			} catch (error) {
				console.error("Error fetching users:", error);
				toast.error("Failed to load users");
			} finally {
				setLoading(false);
			}
		};
		if(loading){
			fetchUsers();
		}
	}, [loading]);

	useEffect(() => {
		const results = users.filter(user =>
			user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.phone?.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredUsers(results);
	}, [searchTerm, users]);

	function handleBlockUser(email, currentStatus) {
		const token = localStorage.getItem("token");
		const action = currentStatus ? "unblock" : "block";

		toast.promise(
			axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/users/block/${email}`, {}, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			}).then(() => {
				setLoading(true);
			}),
			{
				loading: `${action}ing user...`,
				success: `User successfully ${action}ed`,
				error: `Failed to ${action} user`
			}
		);
	}

	return (
		<div className="p-6 max-w-[1400px] mx-auto">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-4">User Management</h1>
				<div className="flex items-center bg-white rounded-lg shadow-md px-4 py-2 w-full max-w-md">
					<FaSearch className="text-gray-400 mr-2" />
					<input
						type="text"
						placeholder="Search users..."
						className="w-full outline-none text-gray-700"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			{loading ? (
				<div className="w-full h-64 flex flex-col items-center justify-center">
					<div className="w-16 h-16 border-4 border-purple-500 border-t-transparent animate-spin rounded-full"></div>
					<p className="mt-4 text-gray-600 font-medium animate-pulse">Loading users...</p>
				</div>
			) : (
				<div className="bg-white rounded-xl shadow-lg overflow-hidden">
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
								<tr>
									<th className="px-6 py-4 text-left">Profile</th>
									<th className="px-6 py-4 text-left">Name</th>
									<th className="px-6 py-4 text-left">Email</th>
									<th className="px-6 py-4 text-left">Role</th>
									<th className="px-6 py-4 text-left">Phone</th>
									<th className="px-6 py-4 text-left">Address</th>
									<th className="px-6 py-4 text-left">Status</th>
									<th className="px-6 py-4 text-left">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{filteredUsers.map((user) => (
									<tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
										<td className="px-6 py-4">
											<div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
												<img
													src={user.profilePicture || "https://via.placeholder.com/50"}
													alt="Profile"
													className="w-full h-full object-cover"
												/>
											</div>
										</td>
										<td className="px-6 py-4 font-medium text-gray-900">
											{user.firstName} {user.lastName}
										</td>
										<td className="px-6 py-4 text-gray-600">
											<div className="flex items-center">
												<FaEnvelope className="mr-2 text-gray-400" />
												{user.email}
											</div>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center">
												<FaUserShield className={`mr-2 ${user.role === 'admin' ? 'text-purple-500' : 'text-blue-500'}`} />
												<span className={`capitalize px-3 py-1 rounded-full text-sm ${
													user.role === 'admin' 
														? 'bg-purple-100 text-purple-700' 
														: 'bg-blue-100 text-blue-700'
												}`}>
													{user.role}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 text-gray-600">
											<div className="flex items-center">
												<FaPhone className="mr-2 text-gray-400" />
												{user.phone || user.phoneNumber || "N/A"}
											</div>
										</td>
										<td className="px-6 py-4 text-gray-600">
											<div className="flex items-center">
												<FaMapMarkerAlt className="mr-2 text-gray-400" />
												{user.address || "N/A"}
											</div>
										</td>
										<td className="px-6 py-4">
											<span className={`px-3 py-1 rounded-full text-sm font-medium ${
												user.isBlocked
													? 'bg-red-100 text-red-700'
													: 'bg-green-100 text-green-700'
											}`}>
												{user.isBlocked ? "Blocked" : "Active"}
											</span>
										</td>
										<td className="px-6 py-4">
											<button
												onClick={() => handleBlockUser(user.email, user.isBlocked)}
												className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
													user.isBlocked
														? 'bg-green-500 hover:bg-green-600 text-white'
														: 'bg-red-500 hover:bg-red-600 text-white'
												}`}
											>
												{user.isBlocked ? "Unblock" : "Block"}
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{filteredUsers.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							<FaUser className="mx-auto text-4xl mb-2 text-gray-400" />
							<p>No users found matching your search criteria</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
