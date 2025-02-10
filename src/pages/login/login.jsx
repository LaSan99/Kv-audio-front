import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      toast.success("Login Success");
      localStorage.setItem("token", res.data.token);

      const user = res.data.user;
      if (user.role === "admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-full h-screen flex justify-center items-center">
      <form onSubmit={handleOnSubmit} className="w-full max-w-md">
        <div className="bg-white bg-opacity-80 rounded-3xl shadow-2xl p-8 flex flex-col items-center z-10">
          <img
            src="/logo.png"
            alt="logo"
            className="w-24 h-24 object-cover animate-bounce"
          />

          <h1 className="text-3xl font-bold text-gray-800 mt-4">Welcome Back!</h1>
          <p className="text-gray-600 mb-6">Please login to continue</p>

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 bg-transparent border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-yellow-300 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-6 bg-transparent border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:border-yellow-300 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-yellow-400 text-white text-xl font-semibold rounded-lg hover:bg-yellow-500 transition-all flex items-center justify-center"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-yellow-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}