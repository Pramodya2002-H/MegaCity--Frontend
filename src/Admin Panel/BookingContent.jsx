import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingContent = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to get the JWT token from local storage
  const getToken = () => {
    return localStorage.getItem("jwtToken"); // Assuming the token is stored with the key 'jwtToken'
  };

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const token = getToken();
      const response = await axios.get("http://localhost:8080/auth/booking/getallBookings", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the header
        },
      });
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Delete a booking
  const handleDelete = async (bookingId) => {
    try {
      const token = getToken();
      await axios.delete(`http://localhost:8080/auth/booking/delete/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the header
        },
      });
      fetchBookings(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-yellow-500">Bookings List</h1>
      <table className="min-w-full bg-gray-900 border border-yellow-500">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Booking ID</th>
            <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Customer ID</th>
            <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Driver ID</th>
            <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Car ID</th>
            <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Pickup Date</th>
            <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Pickup Location</th>
            <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Drop Location</th>
            <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Total Amount</th>
            <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Status</th>
            <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId} className="hover:bg-gray-800">
              <td className="py-2 px-4 border-b border-yellow-500 text-white">{booking.bookingId}</td>
              <td className="py-2 px-4 border-b border-yellow-500 text-white">{booking.customerId}</td>
              <td className="py-2 px-4 border-b border-yellow-500 text-white">{booking.driverId}</td>
              <td className="py-2 px-4 border-b border-yellow-500 text-white">{booking.carId}</td>
              <td className="py-2 px-4 border-b border-yellow-500 text-white">{booking.pickupDate}</td>
              <td className="py-2 px-4 border-b border-yellow-500 text-white">{booking.pickupLocation}</td>
              <td className="py-2 px-4 border-b border-yellow-500 text-white">{booking.dropLocation}</td>
              <td className="py-2 px-4 border-b border-yellow-500 text-white">{booking.totalAmount}</td>
              <td className="py-2 px-4 border-b border-yellow-500 text-white">
                {booking.completed ? "Completed" : "Pending"}
              </td>
              <td className="py-2 px-4 border-b border-yellow-500">
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 cursor-pointer"
                  onClick={() => handleDelete(booking.bookingId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingContent;