import { useState } from "react";
import { useLocation } from "react-router-dom";

const Booking = () => {
  const pricePerKm = 100;
  const location = useLocation();
  const { selectedVehicle, selectedDriver } = location.state || {};

  const [formData, setFormData] = useState({
    userName: "",
    pickupLocation: "",
    dropoffLocation: "",
    kilometers: "",
    date: "",
    time: "",
    rideType: "standard",
    passengers: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking Submitted! 🚖");
    console.log(formData);
  };

  const totalPrice = formData.kilometers * pricePerKm;

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/src/assets/booking.avif')" }}>
      <div className="dark max-w-lg mx-auto p-20 bg-black/40 text-white shadow-2xl rounded-3xl backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Book Your Ride 🚖</h2>
        {/* Show selected vehicle and driver */}
        {selectedVehicle && selectedDriver && (
          <div className="mb-6 p-4 bg-gray-800 rounded-xl shadow-lg">
            <p className="text-xl font-semibold">Vehicle: <span className="text-yellow-400">{selectedVehicle.name}</span></p>
            <p className="text-xl font-semibold">Driver: <span className="text-yellow-400">{selectedDriver}</span></p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-semibold">Pickup Location</label>
            <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required className="w-full p-3 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter pickup location" />
          </div>
          <div>
            <label className="block text-sm font-semibold">Drop-off Location</label>
            <input type="text" name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange} required className="w-full p-3 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter drop-off location" />
          </div>
          <div>
            <label className="block text-sm font-semibold">Distance in Kilometers</label>
            <input type="number" name="kilometers" value={formData.kilometers} onChange={handleChange} required min="1" className="w-full p-3 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Enter distance in kilometers" />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-semibold">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full p-3 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-semibold">Time</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full p-3 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold">Ride Type</label>
            <select name="rideType" value={formData.rideType} onChange={handleChange} className="w-full p-3 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500">
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold">Passengers</label>
            <input type="number" name="passengers" min="1" value={formData.passengers} onChange={handleChange} className="w-full p-3 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold">Total Price (LKR)</label>
            <input type="text" readOnly value={`LKR ${totalPrice}`} className="w-full p-3 border rounded-md bg-gray-200 text-gray-700" />
          </div>
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-md transition duration-300">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
