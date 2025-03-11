import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CarContent = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    // Function to get the JWT token from local storage
    const getToken = () => {
        return localStorage.getItem('jwtToken'); // Assuming the token is stored with the key 'jwtToken'
    };

    // Fetch all cars
    const fetchCars = async () => {
        try {
            const token = getToken();
            const response = await axios.get('http://localhost:8080/auth/cars/car', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the JWT token in the header
                }
            });
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    // Delete a car
    const handleDelete = async (carId) => {
        try {
            const token = getToken();
            await axios.delete(`http://localhost:8080/auth/cars/${carId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the JWT token in the header
                }
            });
            fetchCars(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-yellow-500">Cars List</h1>
            <table className="min-w-full bg-gray-900 border border-yellow-500">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Car ID</th>
                        <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Brand</th>
                        <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Model</th>
                        <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">License Plate</th>
                        <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Capacity</th>
                        <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Available</th>
                        <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Base Rate</th>
                        <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Driver Rate</th>
                        <th className="py-2 px-4 border-b border-yellow-500 text-yellow-500">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.carId} className="hover:bg-gray-800">
                            <td className="py-2 px-4 border-b border-yellow-500 text-white">{car.carId}</td>
                            <td className="py-2 px-4 border-b border-yellow-500 text-white">{car.brand}</td>
                            <td className="py-2 px-4 border-b border-yellow-500 text-white">{car.model}</td>
                            <td className="py-2 px-4 border-b border-yellow-500 text-white">{car.licensePlate}</td>
                            <td className="py-2 px-4 border-b border-yellow-500 text-white">{car.capacity}</td>
                            <td className="py-2 px-4 border-b border-yellow-500 text-white">
                                {car.available ? 'Yes' : 'No'}
                            </td>
                            <td className="py-2 px-4 border-b border-yellow-500 text-white">{car.baseRate}</td>
                            <td className="py-2 px-4 border-b border-yellow-500 text-white">{car.driverRate}</td>
                            <td className="py-2 px-4 border-b border-yellow-500">
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 cursor-pointer"
                                    onClick={() => handleDelete(car.carId)}
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

export default CarContent;