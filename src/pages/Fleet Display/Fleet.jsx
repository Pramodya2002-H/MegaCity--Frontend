import { useState, useEffect } from "react";
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
          pricePerDay: car.pricePerDay || Math.floor(Math.random() * 50) + 50,
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
    setSelectedCabId(cabId);
    setShowModal(true);
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          <p className="mt-4 text-white font-medium">Loading fleet information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {/* Header Section */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Professional Fleet Management</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 text-gray-400">
            Explore our premium fleet of vehicles, meticulously curated for your business and travel needs in Colombo City.
          </p>
        </div>
      </div>

      {/* Filter Section with Sticky Header */}
      <div className="sticky top-0 z-10 bg-black shadow-lg border-b border-gray-600">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-semibold text-white mb-2">Vehicle Type</label>
                <select
                  className="w-full p-4 bg-gray-800 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all text-white"
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
                <label className="block text-sm font-semibold text-white mb-2">Availability Status</label>
                <select
                  className="w-full p-4 bg-gray-800 border border-gray-400 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all text-white"
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
              className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-400"
              aria-label="Reset filters"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="container mx-auto px-6 py-8 border-b border-gray-600">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">{filteredCabs.length} Vehicles Found</h2>
          <p className="text-gray-400 text-lg">Showing {filteredCabs.length} of {cabs.length} vehicles</p>
        </div>
      </div>

      {/* Cabs Grid */}
      <div className="container mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCabs.length > 0 ? (
          filteredCabs.map((cab) => (
            <div
              key={cab.id}
              className="bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-400 hover:border-gray-500 backdrop-blur-sm"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleBooking(cab.id)}
              aria-label={`Book ${cab.brand} ${cab.model}`}
            >
              <div className="relative group">
                <img
                  src={cab.image}
                  alt={`${cab.brand} ${cab.model}`}
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      cab.available ? "bg-gray-400 text-black" : "bg-gray-600 text-white"
                    } shadow-md`}
                  >
                    {cab.available ? "Available" : "Unavailable"}
                  </span>
                </div>
                {cab.isElectric && (
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-gray-300 text-black rounded-full text-sm font-medium border border-gray-400 shadow-md flex items-center">
                      Eco-Friendly <span className="ml-2">🌱</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <h3 className="text-2xl font-semibold text-black">{cab.brand} {cab.model}</h3>
                  <div className="text-black font-bold text-xl">
                    ${cab.pricePerDay}
                    <span className="text-gray-600 text-base font-normal">/day</span>
                  </div>
                </div>

                <div className="bg-gray-100 p-5 rounded-xl mb-6 border border-gray-400">
                  <div className="grid grid-cols-2 gap-y-3 text-base">
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-3">
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
                      <span className="font-medium text-black">Type:</span>
                    </div>
                    <span className="text-gray-600">{cab.type}</span>

                    <div className="flex items-center">
                      <span className="text-gray-600 mr-3">
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
                      <span className="font-medium text-black">Seats:</span>
                    </div>
                    <span className="text-gray-600">{cab.seats}</span>

                    <div className="flex items-center">
                      <span className="text-gray-600 mr-3">
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
                      <span className="font-medium text-black">Price:</span>
                    </div>
                    <span className="text-gray-600">${cab.pricePerDay} / day</span>
                  </div>
                </div>

                <button
                  className="w-full bg-gray-200 text-black font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={() => handleBooking(cab.id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-white font-semibold text-2xl py-20">
            No vehicles match your search criteria.
          </div>
        )}
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-xl font-semibold text-black mb-4">Booking Confirmation</h2>
            <p className="text-gray-600 mb-6">
              Booking initiated for cab ID: {selectedCabId}
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300"
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