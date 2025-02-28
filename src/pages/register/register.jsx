import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
      email,
      firstName,
      lastName,
      password,
      address,
      phone,
    })
    .then(() => {
      toast.success("Registration Success");
      navigate("/login");
    })
    .catch((err) => {
      toast.error(err?.response?.data?.error || "An error occurred");
    });
  };

  return (
    <div className="bg-cover bg-center w-full h-screen flex justify-center items-center bg-[url('/path/to/your/background.jpg')]">
      <form onSubmit={handleOnSubmit} className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-8 w-96">
        <img
          src="/logo.png"
          alt="logo"
          className="w-24 h-24 object-cover mb-6 mx-auto"
        />
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <input
          type="text"
          placeholder="First Name"
          className="input-field mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#efac38]"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input-field mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#efac38]"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#efac38]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#efac38]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="input-field mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#efac38]"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          className="input-field mb-4 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#efac38]"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="my-4 w-full h-12 bg-[#efac38] text-2xl text-white rounded-lg hover:bg-[#d89a2e] transition duration-200">
          Register
        </button>
      </form>
    </div>
  );
}