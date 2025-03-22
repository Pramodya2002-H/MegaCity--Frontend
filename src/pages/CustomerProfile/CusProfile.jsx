import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for notifications

const CusProfile = () => {
  const { customerId } = useParams(); // Get customerId from URL parameter
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch customer data from the backend
  useEffect(() => {
    const fetchCustomerProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error("No authentication token found. Please log in again.");
        }

        const response = await fetch(`http://localhost:8080/auth/customers/getCustomer/${customerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          } else if (response.status === 404) {
            throw new Error("Customer not found.");
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching customer profile:", error);
        if (error.message.includes("Authentication failed")) {
          toast.error(error.message);
          localStorage.removeItem('jwtToken'); // Clear invalid token
          navigate('/login', { state: { from: location.pathname } });
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerProfile();
  }, [customerId, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
          <p className="mt-6 text-white font-semibold text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg border border-yellow-500/30">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-all"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (!customer) {
    return null; // Shouldn't reach here due to error handling, but added as a safeguard
  }

  // Creative badge generation based on membership or booking count (assumed fields)
  const getMembershipBadge = () => {
    const bookingCount = customer.bookingCount || 0;
    if (bookingCount >= 10) return "Platinum Member";
    if (bookingCount >= 5) return "Gold Member";
    if (bookingCount >= 1) return "Silver Member";
    return "New Member";
  };

  const membershipColor = {
    "Platinum Member": "bg-gradient-to-r from-purple-600 to-indigo-600",
    "Gold Member": "bg-gradient-to-r from-yellow-500 to-orange-500",
    "Silver Member": "bg-gradient-to-r from-gray-400 to-gray-600",
    "New Member": "bg-gradient-to-r from-gray-700 to-gray-900",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Header />

      {/* Profile Header with Animated Background */}
      <div className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-black animate-pulse"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-block animate-float">
            <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <span className="text-4xl font-bold text-black">{customer.firstName?.charAt(0)}{customer.lastName?.charAt(0)}</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-yellow-400 drop-shadow-lg">
            {customer.firstName} {customer.lastName}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Welcome to Your Personalized Profile
          </p>
          <span
            className={`mt-4 inline-block px-6 py-2 rounded-full text-white font-semibold shadow-md ${membershipColor[getMembershipBadge()]}`}
          >
            {getMembershipBadge()}
          </span>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl border border-yellow-500/30 backdrop-blur-md">
          <h2 className="text-3xl font-semibold text-yellow-400 mb-6 border-b border-yellow-500/30 pb-4">
            Profile Overview
          </h2>
          <div className="space-y-6 text-gray-300">
            <div className="flex items-center">
              <span className="w-32 text-yellow-400 font-medium">Customer ID:</span>
              <span className="text-lg">{customer.customerId}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 text-yellow-400 font-medium">Email:</span>
              <span className="text-lg">{customer.email}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 text-yellow-400 font-medium">Phone:</span>
              <span className="text-lg">{customer.phoneNumber}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 text-yellow-400 font-medium">Address:</span>
              <span className="text-lg">{customer.address || "Not provided"}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 text-yellow-400 font-medium">Bookings:</span>
              <span className="text-lg">{customer.bookingCount || 0}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => navigate('/edit-profile')}
              className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-all shadow-md"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigate('/bookings')}
              className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all shadow-md"
            >
              View Bookings
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CusProfile;