import { useState, useEffect } from 'react';
import { FaCheck, FaTrash, FaReply } from 'react-icons/fa';

export default function AdminInquiryPage() {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [response, setResponse] = useState('');

    // Fetch inquiries
    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch inquiries');
            }
            
            const data = await response.json();
            setInquiries(data);
            setLoading(false);
        } catch (error) {
            setError('Failed to load inquiries');
            setLoading(false);
        }
    };

    // Delete inquiry
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete inquiry');
            }

            setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
        } catch (error) {
            setError('Failed to delete inquiry');
        }
    };

    // Update inquiry with response
    const handleRespond = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/inquiries/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    response: selectedInquiry.response,
                    isResolved: true
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update inquiry');
            }

            // Update inquiries list
            setInquiries(inquiries.map(inquiry => 
                inquiry.id === id 
                    ? { ...inquiry, response: selectedInquiry.response, isResolved: true }
                    : inquiry
            ));
            setSelectedInquiry(null);
        } catch (error) {
            setError('Failed to update inquiry');
        }
    };

    if (loading) return <div className="text-center p-8">Loading...</div>;
    if (error) return <div className="text-red-600 text-center p-8">{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Manage Inquiries</h1>

            {/* Inquiries List */}
            <div className="grid gap-6">
                {inquiries.map((inquiry) => (
                    <div key={inquiry.id} 
                         className={`bg-white p-6 rounded-lg shadow-md ${inquiry.isResolved ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-lg">{inquiry.email}</h3>
                                <p className="text-gray-600 text-sm">Phone: {inquiry.phone}</p>
                                <p className="text-gray-600 text-sm">
                                    Date: {new Date(inquiry.date).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {!inquiry.isResolved && (
                                    <button
                                        onClick={() => setSelectedInquiry(inquiry)}
                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                        title="Reply"
                                    >
                                        <FaReply />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(inquiry.id)}
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <p className="font-semibold">Message:</p>
                            <p className="text-gray-700">{inquiry.message}</p>
                        </div>

                        {inquiry.response && (
                            <div className="mt-4 bg-gray-50 p-4 rounded">
                                <p className="font-semibold">Response:</p>
                                <p className="text-gray-700">{inquiry.response}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Response Modal */}
            {selectedInquiry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
                        <h2 className="text-2xl font-bold mb-4">Respond to Inquiry</h2>
                        <div className="mb-4">
                            <p className="font-semibold">Original Message:</p>
                            <p className="text-gray-700">{selectedInquiry.message}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Your Response:</label>
                            <textarea
                                className="w-full p-2 border rounded"
                                rows="4"
                                value={selectedInquiry.response || ''}
                                onChange={(e) => setSelectedInquiry({
                                    ...selectedInquiry,
                                    response: e.target.value
                                })}
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setSelectedInquiry(null)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleRespond(selectedInquiry.id)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Send Response
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {inquiries.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-600">No inquiries found</p>
                </div>
            )}
        </div>
    );
}
