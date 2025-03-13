import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

  const navigate = useNavigate();

  // Exchange rate for USD to LKR
  const exchangeRate = 300;

  // Convert prices to Rs and format with the currency symbol
  const convertToRs = (priceInUSD) => {
    const priceInRs = priceInUSD * exchangeRate;
    return `Rs ${priceInRs.toLocaleString("en-LK")}`;
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchCabs = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/auth/cars/car");
        const data = await response.json();

        const mappedCabs = data.map((car) => ({
          id: car.carId,
          brand: car.carBrand,
          model: car.carModel,
          type: car.carType || "Economy",
          seats: car.capacity,
          available: car.available,
          image: car.carImgUrl || "https://via.placeholder.com/300x200?text=No+Image",
          isElectric: car.isElectric || false,
          pricePerDayUSD: car.pricePerDay || Math.floor(Math.random() * 50) + 50, // Price in USD
        }));

        setCabs(mappedCabs);
        setFilteredCabs(mappedCabs);
      } catch (error) {
        console.error("Error fetching cabs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCabs();
  }, []);

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

  // Car types for filter dropdown
  const carTypes = ["All", "Economy", "Luxury", "Van"];

  // Handle booking
  const handleBooking = (cabId) => {
    navigate(`/booking`); // Navigate to the booking page with the cab ID
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCabId(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />

      {/* Header Section with Animated Gradient */}
      <div className="relative bg-gradient-to-r from-yellow-500 via-gray-800 to-black text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops)s)] from-yellow-500/20 via-transparent to-transparent animate-pulse"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
            Discover Our Elite Fleet
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 text-gray-300 font-light">
            Experience luxury and reliability with our premium vehicles, tailored for your journey in Colombo City.
          </p>
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

      {/* Cabs Grid with Creative Card Design */}
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

              {/* Card Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <h3 className="text-2xl font-bold text-yellow-400 tracking-wide">
                    {cab.brand} {cab.model}
                  </h3>
                  <div className="text-yellow-400 font-bold text-xl">
                    {convertToRs(cab.pricePerDayUSD)}
                    <span className="text-gray-400 text-base font-normal">/day</span>
                  </div>
                </div>

                {/* Details Section with Gradient Background */}
                <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-5 rounded-xl mb-6 border border-yellow-500/20 shadow-inner">
                  <div className="grid grid-cols-2 gap-y-4 text-base">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v7z"
                          />
                        </svg>
                      </span>
                      <span className="font-medium text-gray-200">Type:</span>
                    </div>
                    <span className="text-gray-300">{cab.type}</span>

                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3l1.293-1.293a1 1 0 011.414 0l5.793 5.793a1 1 0 010 1.414L7.707 12.707A1 1 0 016 12V5a1 1 0 011-1z"
                          />
                        </svg>
                      </span>
                      <span className="font-medium text-gray-200">Seats:</span>
                    </div>
                    <span className="text-gray-300">{cab.seats}</span>

                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                        </svg>
                      </span>
                      <span className="font-medium text-gray-200">Price:</span>
                    </div>
                    <span className="text-gray-300">{convertToRs(cab.pricePerDayUSD)}/day</span>
                  </div>
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