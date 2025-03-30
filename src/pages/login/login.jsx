import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
          accessToken: res.access_token,
        })
        .then((res) => {
          toast.success("Login Success");
          const user = res.data.user;
          localStorage.setItem("token", res.data.token);
          if (user.role === "admin") {
            navigate("/admin/");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          toast.error("Google login failed");
        });
    },
  });

  function handleOnSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        toast.success("Login Success");
        const user = res.data.user;
        localStorage.setItem("token", res.data.token);
        if (user.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Login failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?q=80&w=2071&auto=format&fit=crop')" }}>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back!</h1>
          </div>

          <form onSubmit={handleOnSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end">
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <button
            onClick={googleLogin}
            className="mt-6 w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <FaGoogle className="text-xl text-red-500" />
            Sign in with Google
          </button>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
