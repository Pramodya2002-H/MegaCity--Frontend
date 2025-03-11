import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DriverContent = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetchDrivers();
    }, []);

    // Function to get the JWT token from local storage
    const getToken = () => {
        return localStorage.getItem('jwtToken'); // Assuming the token is stored with the key 'jwtToken'
    };

    const fetchDrivers = async () => {
        try {
            const token = getToken();
            const response = await axios.get('http://localhost:8080/auth/driver/getalldrivers', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the JWT token in the header
                }
            });
            setDrivers(response.data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const handleDelete = async (driverId) => {
        try {
            const token = getToken();
            await axios.delete(`http://localhost:8080/auth/driver/${driverId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the JWT token in the header
                }
            });
            fetchDrivers(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting driver:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Drivers List</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Driver ID</th>
                        <th className="py-2 px-4 border-b">Driver Name</th>
                        <th className="py-2 px-4 border-b">License No</th>
                        <th className="py-2 px-4 border-b">Phone Number</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Available</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) => (
                        <tr key={driver.driverId} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b">{driver.driverId}</td>
                            <td className="py-2 px-4 border-b">{driver.driverName}</td>
                            <td className="py-2 px-4 border-b">{driver.driverLicenseNo}</td>
                            <td className="py-2 px-4 border-b">{driver.driverPhoneNum}</td>
                            <td className="py-2 px-4 border-b">{driver.email}</td>
                            <td className="py-2 px-4 border-b">
                                {driver.available ? 'Yes' : 'No'}
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 cursor-pointer" 
                                    onClick={() => handleDelete(driver.driverId)}
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

export default DriverContent;