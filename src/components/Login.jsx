import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../util/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        formData
      );
      
      console.log("Login response:", response.data); // Debug log
      
      const { token, userId, role } = response.data;
      
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", role);

      login(token);

      // Navigate based on role
      switch (role) {
        case "ROLE_ADMIN":
          navigate("/dashboard");
          break;
        case "ROLE_CUSTOMER":
          navigate("/fleet");
          break;
        case "ROLE_DRIVER":
          navigate("/driver-dashboard");
          break;
        default:
          setError("Invalid user role");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response) {
        // Handle specific error responses from the server
        switch (error.response.status) {
          case 401:
            setError("Invalid email or password");
            break;
          case 404:
            setError("User not found");
            break;
          case 403:
            setError("Account is locked. Please contact support");
            break;
          default:
            setError("Login failed. Please try again later");
        }
      } else if (error.request) {
        setError("Cannot connect to server. Please check your internet connection");
      } else {
        setError("An unexpected error occurred. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/src/assets/login.webp')" }}
    >
      <div className="max-w-md mx-auto p-10 bg-black/40 text-white shadow-2xl rounded-3xl backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Welcome Back!</h2>
        <p className="text-center mb-4">Please log in to continue</p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 border rounded-md focus:border-yellow-500 focus:ring-yellow-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 border rounded-md focus:border-yellow-500 focus:ring-yellow-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-yellow-500 text-black py-3 rounded-md font-semibold transition-all
              ${isLoading 
                ? 'opacity-70 cursor-not-allowed' 
                : 'hover:bg-yellow-600'}`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          {/* Links */}
          <div className="text-center text-sm text-gray-300 mt-4 space-y-2">
            <p>
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-yellow-500 hover:underline"
              >
                Sign Up
              </Link>
            </p>
            <p>
              {/* <Link
                to="/forgot-password"
                className="text-yellow-500 hover:underline"
              >
                Forgot Password?
              </Link> */}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;