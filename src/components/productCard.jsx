import { Link } from "react-router-dom";
import { FaTag, FaRuler, FaEye } from "react-icons/fa";

export default function ProductCard({ item }) {
  return (
    <div className="w-[300px] bg-white rounded-xl shadow-lg overflow-hidden m-4 relative transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative overflow-hidden group">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
          <span className="text-white font-medium text-sm">Click for details</span>
        </div>
        <div className="absolute top-3 right-3">
          <div className={`px-3 py-1 text-sm rounded-full font-medium ${
            item.availability 
              ? "bg-green-100 text-green-700 border border-green-200" 
              : "bg-red-100 text-red-700 border border-red-200"
          }`}>
            {item.availability ? "In Stock" : "Out of Stock"}
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-2">
          <FaTag className="text-purple-500 mr-2" />
          <span className="text-sm font-medium text-purple-600">{item.category}</span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{item.name}</h2>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-700">
            <FaRuler className="text-blue-500 mr-2 text-sm" />
            <span className="text-xs">{item.dimensions}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-xl font-bold text-green-600">Rs. {item.price?.toFixed(2)}</span>
          <Link 
            to={"/product/"+item.key} 
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            <FaEye />
            <span>View</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
