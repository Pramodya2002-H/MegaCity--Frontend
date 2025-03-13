import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { Bell, User, MapPin, Phone, Mail, Edit, CheckCircle, TrendingUp, ShoppingBag } from "lucide-react"; // Icons from lucide-react

const DriverDashboard = () => {
  const navigate = useNavigate(); // Initialize navigate hook for routing

  // Sample driver data 
  const driver = {
    name: "Yoshan Kavidu",
    joinDate: "March 10, 2025",
    location: "Akuressa R0ad, Galle",
    phone: "0763473683",
    email: "yosh@example.com",
    totalOrders: 24,
    wishlistItems: 12,
    reviews: 8,
    rewardPoints: 350,
  };

  // Sample recent activities 
  const recentActivities = [
    {
      icon: <CheckCircle size={24} className="text-green-500" />,
      title: "Order #12345 Completed",
      description: "Your order has been delivered successfully 2 days ago.",
    },
    {
      icon: <TrendingUp size={24} className="text-yellow-700" />,
      title: "Account Upgraded",
      description: "You’ve been upgraded to Premium membership 1 week ago.",
    },
    {
      icon: <ShoppingBag size={24} className="text-purple-500" />,
      title: "Order #12344 Placed",
      description: "You placed an order for 3 items 2 weeks ago.",
    },
  ];

  const handleEditProfile = () => {
    navigate("/edit-driver-profile"); // Replace with your actual edit profile route
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-400 shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Bell size={24} className="text-gray-600 cursor-pointer hover:text-gray-800" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User size={24} className="text-gray-600" />
            </div>
            <span className="text-gray-800 font-medium">{driver.name}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col md:flex-row gap-6 p-6">
        {/* Left Section: Driver Profile */}
        <div className="bg-black rounded-xl shadow-md p-6 md:w-1/3">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <User size={48} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{driver.name}</h2>
            <p className="text-yellow- text-sm">Member since {driver.joinDate}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-600" />
              <span className="text-white">{driver.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={20} className="text-gray-600" />
              <span className="text-white">{driver.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={20} className="text-gray-600" />
              <span className="text-white">{driver.email}</span>
            </div>
          </div>

          <button
            onClick={handleEditProfile}
            className="mt-6 w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Edit size={20} />
            Edit Profile
          </button>
        </div>

        {/* Right Section: Recent Activity & Summary */}
        <div className="flex-grow space-y-6">
          {/* Recent Activity */}
          <div className="bg-black rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">{activity.icon}</div>
                  <div>
                    <h4 className="text-gray-800 font-semibold">{activity.title}</h4>
                    <p className="text-gray-600 text-sm">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Summary */}
          <div className="bg-black rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Account Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-400 rounded-lg">
                <h4 className="text-gray-600 text-sm font-medium">Total Orders</h4>
                <p className="text-2xl font-bold text-gray-800">{driver.totalOrders}</p>
              </div>
              <div className="text-center p-4 bg-gray-400 rounded-lg">
                <h4 className="text-gray-600 text-sm font-medium">Wishlist Items</h4>
                <p className="text-2xl font-bold text-gray-800">{driver.wishlistItems}</p>
              </div>
              <div className="text-center p-4 bg-gray-400 rounded-lg">
                <h4 className="text-gray-600 text-sm font-medium">Reviews</h4>
                <p className="text-2xl font-bold text-gray-800">{driver.reviews}</p>
              </div>
              <div className="text-center p-4 bg-gray-400 rounded-lg">
                <h4 className="text-gray-600 text-sm font-medium">Reward Points</h4>
                <p className="text-2xl font-bold text-gray-800">{driver.rewardPoints}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;