import { Link } from "react-router-dom";
import { FaTag, FaRuler, FaEye, FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ item }) {
  // Format price with commas for thousands
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image[0]}
          alt={item.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <Link 
              to={"/product/"+item.key}
              className="w-full flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 py-2 rounded-lg font-medium transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            >
              <FaEye className="text-blue-600" />
              <span>View Details</span>
            </Link>
          </div>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className={`px-3 py-1 text-sm rounded-full font-medium shadow-sm backdrop-blur-sm
            ${item.availability 
              ? "bg-green-500/90 text-white" 
              : "bg-red-500/90 text-white"
            }`}
          >
            {item.availability ? "In Stock" : "Out of Stock"}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center mb-2">
          <FaTag className="text-blue-500 mr-2 text-sm" />
          <span className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            {item.category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {item.name}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Specs */}
        <div className="flex items-center text-gray-500 mb-4">
          <FaRuler className="text-blue-500 mr-2 text-sm" />
          <span className="text-sm">{item.dimensions}</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-500 block">Price</span>
            <span className="text-xl font-bold text-gray-800">
              Rs. {formatPrice(item.price)}
            </span>
          </div>
          
          <Link 
            to={"/product/"+item.key}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            <FaShoppingCart className="text-sm" />
            <span className="font-medium">Buy Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
