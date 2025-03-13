import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`, {
          accessToken: res.access_token,
        })
        .then((res) => {
          console.log(res);
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
          console.log(err);
          toast.error("Google login failed");
        });
    },
  });

  function handleOnSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("http://localhost:3000/api/users/login", {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="logo"
            className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg transform transition-transform duration-500 hover:rotate-6"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-gray-500 mt-2">Please sign in to continue</p>
        </div>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={googleLogin}
          className="mt-6 w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg py-3 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
        >
          <FaGoogle className="text-xl text-red-500" />
          Sign in with Google
        </button>

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-300"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
