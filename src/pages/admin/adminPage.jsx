import { BsGraphDown } from "react-icons/bs";
import { FaEnvelope, FaRegBookmark, FaRegUser, FaSignOutAlt, FaStar } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemPage from "./addItemsPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminInquiryPage from "./adminInquiryPage";
import ReviewManagement from "./reveiwManagement";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const validateUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const user = response.data;
        if (user.role === "admin") {
          setUserValidated(true);
          toast.success("Welcome back, Admin!");
        } else {
          toast.error("Unauthorized access");
          window.location.href = "/";
        }
      } catch (error) {
        console.error(error);
        toast.error("Authentication failed");
        setUserValidated(false);
        window.location.href = "/login";
      }
    };

    validateUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/login";
  };

  const isActiveRoute = (path) => {
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: "/admin", icon: <BsGraphDown />, label: "Dashboard" },
    { path: "/admin/orders", icon: <FaRegBookmark />, label: "Orders" },
    { path: "/admin/items", icon: <MdOutlineSpeaker />, label: "Items" },
    { path: "/admin/users", icon: <FaRegUser />, label: "Users" },
    { path: "/admin/inquiries", icon: <FaEnvelope />, label: "Inquiries" },
    { path: "/admin/reviews", icon: <FaStar />, label: "Reviews" },
  ];

  return (
    <div className="w-full h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-[250px] h-full bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your store</p>
        </div>

        <nav className="flex-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                isActiveRoute(item.path)
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <FaSignOutAlt className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {userValidated && (
          <Routes path="/*">
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/items" element={<AdminItemsPage />} />
            <Route path="/inquiries" element={<AdminInquiryPage />} />
            <Route path="/reviews" element={<ReviewManagement />} />
            <Route path="/items/add" element={<AddItemPage />} />
            <Route path="/items/edit" element={<UpdateItemPage />} />
          </Routes>
        )}
      </div>
    </div>
  );
}