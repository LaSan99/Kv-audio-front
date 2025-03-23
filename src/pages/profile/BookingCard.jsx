import { FaCalendar } from 'react-icons/fa';
import { format } from 'date-fns';

export default function BookingCard({ booking }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'Approved':
                return 'bg-green-100 text-green-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold">Order #{booking.orderId}</h3>
                    <p className="text-sm text-gray-600">
                        <FaCalendar className="inline mr-2" />
                        {format(new Date(booking.orderDate), 'PPP')}
                    </p>
                    <p className="text-sm text-gray-600">
                        Rental Period: {format(new Date(booking.startingDate), 'PP')} - {format(new Date(booking.endingDate), 'PP')}
                    </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                </span>
            </div>
            
            <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Rented Items:</p>
                <div className="mt-2 space-y-2">
                    {booking.orderedItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                            <div className="flex items-center space-x-2">
                                <img 
                                    src={item.product.image} 
                                    alt={item.product.name}
                                    className="w-10 h-10 object-cover rounded"
                                />
                                <span className="text-sm">{item.product.name}</span>
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-600">x{item.quantity}</span>
                                <span className="ml-2 font-medium">${item.product.price * item.quantity}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-600">Duration: {booking.days} days</p>
                    {booking.isApproved === 'true' && (
                        <p className="text-sm text-green-600 font-medium">Approved</p>
                    )}
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-lg font-bold">${booking.totalAmount}</p>
                </div>
            </div>
        </div>
    );
} 