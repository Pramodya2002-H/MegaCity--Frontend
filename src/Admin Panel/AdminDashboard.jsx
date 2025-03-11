import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const AdminDashboard = ({ adminName }) => {
  // State for storing the fetched data
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customers
        const customersResponse = await fetch("http://localhost:8080/auth/customers/viewCustomers");
        const customersData = await customersResponse.json();
        setCustomers(customersData);

        // Fetch drivers
        const driversResponse = await fetch("http://localhost:8080/auth/driver/getalldrivers");
        const driversData = await driversResponse.json();
        setDrivers(driversData);

        // Fetch cars
        const carsResponse = await fetch("http://localhost:8080/auth/cars/car");
        const carsData = await carsResponse.json();
        setCars(carsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  // Prepare data for the pie chart
  const pieChartData = [
    { name: "Customers", value: customers.length },
    { name: "Drivers", value: drivers.length },
    { name: "Cars", value: cars.length },
  ];

  // Prepare data for the bar chart
  const barChartData = [
    { name: "Customers", count: customers.length },
    { name: "Drivers", count: drivers.length },
    { name: "Cars", count: cars.length },
  ];

  // Colors for the pie chart (using yellow and black theme)
  const COLORS = ["#FFD700", "#FFA500", "#FF8C00"]; // Shades of yellow/orange

  // Show loading state while fetching data
  if (loading) {
    return <div className="text-white">Loading dashboard data...</div>;
  }

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <h2 className="text-3xl font-semibold text-yellow-500">Dashboard</h2>
      <p className="text-gray-400 mt-2">Welcome, {adminName}!</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart Section */}
        <div className="bg-gray-900 p-4 border border-yellow-500 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-yellow-500">Data Distribution</h3>
          <PieChart width={200} height={300}>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #FFD700", color: "#FFD700" }} />
            <Legend wrapperStyle={{ color: "#FFD700" }} />
          </PieChart>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-gray-900 p-4 border border-yellow-500 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-yellow-500">Data Counts</h3>
          <BarChart width={300} height={300} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#FFD700" />
            <XAxis dataKey="name" stroke="#FFD700" />
            <YAxis stroke="#FFD700" />
            <Tooltip contentStyle={{ backgroundColor: "#1e1e1e", border: "1px solid #FFD700", color: "#FFD700" }} />
            <Legend wrapperStyle={{ color: "#FFD700" }} />
            <Bar dataKey="count" fill="#FFD700" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;