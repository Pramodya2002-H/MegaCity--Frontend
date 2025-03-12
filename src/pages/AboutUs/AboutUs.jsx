import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer'; // Assuming Header and Footer are reusable components

const AboutUs = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Trusted Colombo City Cab Service
          </h1>
          <p className="text-xl text-gray-800 max-w-2xl mx-auto mb-8">
            Providing safe, reliable, and comfortable transportation services to thousands of customers across Colombo since 2015.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 p-6 rounded-lg border border-white/20">
              <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
              <p className="text-gray-800">Monthly Rides</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg border border-white/20">
              <div className="text-3xl font-bold text-gray-900 mb-2">5K+</div>
              <p className="text-gray-800">Active Customers</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg border border-white/20">
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <p className="text-gray-800">Verified Drivers</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg border border-white/20">
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <p className="text-gray-800">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-6">
              Top Cab Service Provider in Sri Lanka   
            </h2>
            <p className="text-xl text-gray-300 mb-8">
            Our dedication to quality and client happiness has allowed Mega City Cab to revolutionize urban transportation in Colombo. For all of your mobility needs, we offer specialized solutions since we know how the city runs.
            </p>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">✓</span> Verified Drivers
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">⏰</span> 24/7 Service
              </div>
            </div>
            <button className="mt-8 bg-[#f59e0b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#fde047] transition-colors">
              Experience the Difference
            </button>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div
              className="rounded-lg shadow-lg w-full h-96 bg-cover bg-center"
              style={{ backgroundImage: "url('/src/assets/aboutUs.jpg')" }}
            />
            <div className="absolute -top-4 -left-4 w-3/4 h-3/4 bg-yellow-400/20 rounded-lg border-4 border-yellow-500 opacity-50 blur-md"></div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;