import { useState, useEffect } from 'react';
import { FaUser, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import BookingCard from './BookingCard';

export default function UserProfile() {
    const [profile, setProfile] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        profilePicture: ''
    });

    // Fetch user profile and bookings
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/users/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            setProfile(data.profile);
            setBookings(data.bookings);
            setEditForm({
                firstName: data.profile.firstName,
                lastName: data.profile.lastName,
                phone: data.profile.phone,
                address: data.profile.address,
                profilePicture: data.profile.profilePicture
            });
            setLoading(false);
        } catch (error) {
            setError('Failed to load profile');
            setLoading(false);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(editForm)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            setProfile(data.user);
            localStorage.setItem('token', data.token);
            setIsEditing(false);
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (error) return <div className="text-red-600 text-center p-8">{error}</div>;
    if (!profile) return <div className="text-center p-8">No profile data found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                {/* Profile Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            <FaEdit /> {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>

                    {isEditing ? (
                        // Edit Form
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        value={editForm.firstName}
                                        onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        value={editForm.lastName}
                                        onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        value={editForm.phone}
                                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                                    <input
                                        type="url"
                                        value={editForm.profilePicture}
                                        onChange={(e) => setEditForm({...editForm, profilePicture: e.target.value})}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <textarea
                                    value={editForm.address}
                                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        // Profile Display
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3">
                                <img
                                    src={profile.profilePicture}
                                    alt="Profile"
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div className="md:w-2/3 space-y-4">
                                <div className="flex items-center gap-2">
                                    <FaUser className="text-indigo-600" />
                                    <div>
                                        <h2 className="text-xl font-semibold">
                                            {profile.firstName} {profile.lastName}
                                        </h2>
                                        <p className="text-gray-600">{profile.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaPhone className="text-indigo-600" />
                                    <p>{profile.phone}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-indigo-600" />
                                    <p>{profile.address}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bookings Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Bookings</h2>
                    <div className="space-y-4">
                        {bookings.length === 0 ? (
                            <p className="text-gray-600 text-center py-4">No bookings found</p>
                        ) : (
                            bookings.map((booking) => (
                                <BookingCard key={booking.orderId} booking={booking} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 