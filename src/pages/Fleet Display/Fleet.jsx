import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import toast from 'react-hot-toast'; // Assuming react-hot-toast is used for notifications

const Fleet = () => {
  const [cabs, setCabs] = useState([]);
  const [filters, setFilters] = useState({
    type: "All",
    availability: "All",
  });
  const [filteredCabs, setFilteredCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCabId, setSelectedCabId] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Exchange rate for USD to LKR
  const exchangeRate = 300;

  // Convert prices to Rs and format with the currency symbol
  const convertToRs = (priceInUSD) => {
    const priceInRs = priceInUSD * exchangeRate;
    return `Rs ${priceInRs.toLocaleString("en-LK")}`;
  };

  // Fetch customer profile
  useEffect(() => {
    const fetchCustomerProfile = async () => {
      const customerId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
      if (!customerId) {
        setCustomer(null);
        return;
      }

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
            throw new Error("Customer profile not found.");
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
          setCustomer(null); // Clear customer if fetch fails
        }
      }
    };

    fetchCustomerProfile();
  }, [navigate, location.pathname]);

  // Fetch cabs data from the backend
  useEffect(() => {
    const fetchCabs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error("No authentication token found. Please log in again.");
        }

        const response = await fetch("http://localhost:8080/auth/cars/car", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const mappedCabs = data.map((car) => ({
          id: car.carId,
          brand: car.carBrand,
          model: car.carModel,
          available: car.available,
          image: car.carImage || "https://via.placeholder.com/300x200?text=No+Image",
          ...car, // Spread all other fields from the API response
        }));

        setCabs(mappedCabs);
        setFilteredCabs(mappedCabs);
      } catch (error) {
        console.error("Error fetching cabs:", error);
        if (error.message.includes("Authentication failed")) {
          toast.error(error.message);
          localStorage.removeItem('jwtToken'); // Clear invalid token
          navigate('/login', { state: { from: location.pathname } });
        } else {
          toast.error("Unable to load vehicles. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCabs();
  }, [navigate, location.pathname]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Apply filters whenever filters state changes
  useEffect(() => {
    let result = [...cabs];

    if (filters.type !== "All") {
      result = result.filter((cab) => cab.type === filters.type);
    }

    if (filters.availability !== "All") {
      const isAvailable = filters.availability === "Available";
      result = result.filter((cab) => cab.available === isAvailable);
    }

    setFilteredCabs(result);
  }, [filters, cabs]);

  // Reset filters
  const resetFilters = () => {
    setFilters({ type: "All", availability: "All" });
  };

  // Car types for filter dropdown (fetched dynamically from cabs if available)
  const carTypes = ["All", ...(new Set(cabs.map((cab) => cab.type || "Economy")))];

  // Handle booking
  const handleBooking = (cabId) => {
    navigate(`/booking`, { state: { selectedCar: cabs.find(cab => cab.id === cabId) } }); // Pass selected car data
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCabId(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    toast.success("Logged out successfully!");
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          <p className="mt-4 text-white font-medium">Loading fleet information...</p>
        </div>
      </div>
    );
  }

  // Get the first letter of the customer's name
  const getCustomerInitial = () => {
    return customer?.firstName?.charAt(0) || 'U'; // 'U' as fallback for unknown user
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header Section with Animated Gradient and Professional Profile */}
      <div className="relative bg-gradient-to-r from-yellow-500 via-gray-800 to-black text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent animate-pulse"></div>
        <div className="container mx-auto relative z-10">
          {/* Professional Customer Profile in Upper-Right Corner */}
          <div className="absolute top-6 right-6 z-20">
            {customer ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-2 text-sm font-bold text-white">
                    {getCustomerInitial()}
                  </div>
                  <span className="hidden md:inline">{customer.firstName} {customer.lastName || ''}</span>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg border border-gray-700 py-1 z-30">
                    <button
                      onClick={() => navigate(`/cusProfile/${localStorage.getItem('userId')}`)}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 text-sm"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate('/edit-profile')}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 text-sm"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-md shadow-sm transition-all duration-200"
              >
                Login
              </button>
            )}
          </div>

          {/* Main Header Content */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
              Discover Our Elite Fleet
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 text-gray-300 font-light">
              Experience luxury and reliability with our premium vehicles, tailored for your journey in Colombo City.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Section with Enhanced Design */}
      <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-yellow-500/30">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-semibold text-yellow-400 mb-2">Vehicle Type</label>
                <select
                  className="w-full p-4 bg-gray-800 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white shadow-md"
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  aria-label="Filter by car type"
                >
                  {carTypes.map((type) => (
                    <option key={type} value={type} className="bg-gray-800 text-white">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-1/3">
                <label className="block text-sm font-semibold text-yellow-400 mb-2">Availability Status</label>
                <select
                  className="w-full p-4 bg-gray-800 border border-yellow-500/30 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white shadow-md"
                  value={filters.availability}
                  onChange={(e) => handleFilterChange("availability", e.target.value)}
                  aria-label="Filter by availability"
                >
                  <option value="All" className="bg-gray-800 text-white">All Vehicles</option>
                  <option value="Available" className="bg-gray-800 text-white">Available Now</option>
                  <option value="Unavailable" className="bg-gray-800 text-white">Currently Unavailable</option>
                </select>
              </div>
            </div>
            <button
              onClick={resetFilters}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-yellow-600"
              aria-label="Reset filters"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary with Gradient Border */}
      <div className="container mx-auto px-6 py-8 border-b border-yellow-500/30 bg-gray-800/50 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-yellow-400">{filteredCabs.length} Vehicles Found</h2>
          <p className="text-gray-300 text-lg">Showing {filteredCabs.length} of {cabs.length} vehicles</p>
        </div>
      </div>

      {/* Cabs Grid with Simplified Card Design */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCabs.length > 0 ? (
          filteredCabs.map((cab) => (
            <div
              key={cab.id}
              className="relative bg-gray-800 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl border border-yellow-500/30 backdrop-blur-sm group hover:-translate-y-2"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleBooking(cab.id)}
              aria-label={`Book ${cab.brand} ${cab.model}`}
            >
              {/* Image with Hover Effect */}
              <div className="relative group">
                <img
                  src={cab.image}
                  alt={`${cab.brand} ${cab.model}`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium shadow-lg ${
                      cab.available ? "bg-yellow-500 text-black" : "bg-gray-600 text-white"
                    } animate-pulse`}
                  >
                    {cab.available ? "Available" : "Unavailable"}
                  </span>
                </div>
                {cab.isElectric && (
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium border border-green-600 shadow-lg flex items-center animate-bounce">
                      Eco-Friendly <span className="ml-2">🌱</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Simplified Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <h3 className="text-2xl font-bold text-yellow-400 tracking-wide">
                    {cab.brand} {cab.model}
                  </h3>
                </div>

                {/* Book Now Button with Hover Effect */}
                <button
                  className="w-full bg-yellow-500 text-black font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-yellow-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  onClick={() => handleBooking(cab.id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-yellow-400 font-semibold text-2xl py-20 animate-pulse">
            No vehicles match your search criteria.
          </div>
        )}
      </div>

      {/* Booking Confirmation Modal with Enhanced Design */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-yellow-500/30 transform transition-all duration-300 scale-100 hover:scale-105">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Booking Confirmation</h2>
            <p className="text-gray-300 mb-6">
              Booking initiated for cab ID: <span className="font-bold text-yellow-400">{selectedCabId}</span>
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Fleet;