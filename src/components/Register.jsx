import { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import loginPageImg from "../assets/taxi.jpg"; // Adjust path if needed

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "", // Maps to customerName
    phoneNo: "",  // Added for backend model
    address: "",  // Added for backend model
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check terms acceptance
    if (!termsAccepted) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Map formData to backend Customer model
    const customerData = {
      customerName: formData.fullName,
      address: formData.address,
      phoneNo: formData.phoneNo,
      email: formData.email,
      password: formData.password,
      role: "CUSTOMER", // Matches default in backend model
    };

    try {
      const response = await fetch("http://localhost:8080/auth/customers/createCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create customer");
      }

      const result = await response.json();
      console.log("Customer created successfully:", result);

      // Reset form on success
      setFormData({
        email: "",
        fullName: "",
        phoneNo: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
      setTermsAccepted(false);
      alert("Account created successfully! Please log in.");
    } catch (error) {
      console.error("Error creating customer:", error);
      setError(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-cover bg-center relative">
      {/* Background with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={loginPageImg}
          alt="Taxi street scene"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      </div>

      {/* Registration Form Container */}
      <div className="relative max-w-md w-full mx-auto p-10 bg-black/40 text-white shadow-2xl rounded-3xl backdrop-blur-md border border-gray-700/50">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Hi! Welcome</h2>
        <p className="text-center mb-6 text-gray-300">Let's create your account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 text-red-200 p-3 rounded text-sm text-center">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Full Name (customerName) */}
          <div className="space-y-1">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Phone Number (phoneNo) */}
          <div className="space-y-1">
            <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-200">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label htmlFor="address" className="block text-sm font-medium text-gray-200">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
              minLength="8"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
              minLength="8"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={handleTermsChange}
              className="h-4 w-4 text-yellow-500 border-gray-700 rounded focus:ring-yellow-500 bg-gray-900/50"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-yellow-500 hover:text-yellow-400">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-yellow-500 hover:text-yellow-400">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-md transition duration-300 disabled:bg-yellow-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-black"
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : null}
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-300">
          Have an account?{" "}
          <Link to="/login" className="text-yellow-500 hover:text-yellow-400">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;