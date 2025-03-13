import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cars from the database
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('jwtToken'); // Add authentication token
        const response = await fetch("http://localhost:8080/auth/cars/car", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error(`Failed to fetch cars: ${response.status}`);
        const data = await response.json();

        const mappedCars = data.map((car) => {
          const carData = {
            id: car.carId,
            brand: car.carBrand,
            model: car.carModel,
            image: car.carImgUrl || "https://via.placeholder.com/300x200?text=No+Image",
            pricePerDay: car.pricePerDay || Math.floor(Math.random() * 50) + 50,
          };
          console.log("Mapped car:", carData); // Debug log
          return carData;
        });

        setCars(mappedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Unable to load cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleBookNow = () => {
    navigate("/fleet");
  };

  const handleViewAllCars = () => {
    navigate("/fleet");
  };

  return (
    <div className="bg-black text-white">
      <Header />

      {/* Hero Section with Animated Background */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/car1.jpg')] bg-cover bg-center opacity-50 animate-pulse"></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-200">
            Welcome to <span className="text-yellow-400">MegaCityCabs</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-400">
            Experience safe, comfortable, and premium travel. Book your ride instantly.
          </p>

          <button
            onClick={handleBookNow}
            className="mt-6 bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Special Event Transportation",
              "Airport Transfers",
              "Outstation Trips",
              "Daily Commutes",
              "Luxury Car Rentals",
              "Corporate Travel",
            ].map((title, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-yellow-300">{title}</h3>
                <p className="mt-2 text-gray-400">Premium quality service for all your needs.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-12">Featured Cars</h2>
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
          ) : error ? (
            <p className="text-red-500 font-medium">{error}</p>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cars.slice(0, 3).map((car) => (
                  <div
                    key={car.id}
                    className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition hover:scale-105"
                  >
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/300x200?text=No+Image")} // Fallback on error
                    />
                    <h3 className="text-xl font-semibold text-yellow-300">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-400 mt-2">
                      ${car.pricePerDay}/day
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={handleViewAllCars}
                className="mt-6 bg-yellow-500 text-black font-bold py-2 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300"
              >
                View All Cars
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#030712]">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">How To Make a Booking</h2>

        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {["Choose Your Ride", "Book Online", "Enjoy Your Ride"].map((title, index) => (
              <div key={index} className="text-center flex-1">
                <div className="w-16 h-16 bg-yellow-500 text-black flex items-center justify-center rounded-full text-2xl font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
                <p className="text-gray-400 mt-2">A seamless and comfortable journey awaits.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;