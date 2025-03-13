import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {
    const [cart, setCart] = useState(loadCart());
    const [startingDate, setStartingDate] = useState(formatDate(new Date()));
    const [endingDate, setEndingDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));
    const [total , setTotal] = useState(0);
    const daysBetween = Math.max((new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24), 1);

    function reloadCart(){
        setCart(loadCart());
        calculateTotal();
        
    }
    function calculateTotal(){
        const cartInfo = loadCart();
        cartInfo.startingDate = startingDate;
        cartInfo.endingDate = endingDate;
        cartInfo.days = daysBetween;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,
            cartInfo
        ).then((res)=>{
            console.log(res.data)
            setTotal(res.data.total);
        }).catch((err)=>{   
            console.error(err);
        })
    }

    useEffect(()=>{
        calculateTotal();
    },[startingDate, endingDate])
    
    function handleBookingCreation(){
        const cart = loadCart();
        cart.startingDate = startingDate;
        cart.endingDate = endingDate;
        cart.days = daysBetween;

        const token = localStorage.getItem("token");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res.data);
            localStorage.removeItem("cart");
            toast.success("Booking Created");
            setCart(loadCart());
        }).catch((err)=>{
            console.error(err);
            toast.error("Failed to create booking");
        })
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl font-bold text-accent text-center mb-8">
                    Create Your Booking
                </h1>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <label className="block">
                            <span className="text-accent font-semibold block mb-2">Starting Date</span>
                            <input 
                                type="date" 
                                value={startingDate} 
                                onChange={(e) => setStartingDate(e.target.value)} 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                            />
                        </label>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                        <label className="block">
                            <span className="text-accent font-semibold block mb-2">Ending Date</span>
                            <input 
                                type="date" 
                                value={endingDate} 
                                onChange={(e) => setEndingDate(e.target.value)} 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                            />
                        </label>
                    </div>
                </div>

                <div className="bg-accent/5 rounded-lg p-4 mb-8">
                    <p className="text-accent font-medium text-center text-lg">
                        Duration: {daysBetween} {daysBetween === 1 ? 'day' : 'days'}
                    </p>
                </div>

                <div className="space-y-4 mb-8">
                    {cart.orderedItems.map((item) => (
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 relative" key={item.key}>
                            <BookingItem itemKey={item.key} qty={item.qty} refresh={reloadCart}/>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-200 pt-6 mt-8">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-xl font-semibold text-gray-700">Total Amount:</p>
                        <p className="text-2xl font-bold text-accent">Rs. {total.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-center">
                        <button 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg
                                font-semibold transition-all duration-200 transform hover:scale-105
                                flex items-center gap-2 shadow-lg hover:shadow-emerald-200"
                            onClick={handleBookingCreation}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}