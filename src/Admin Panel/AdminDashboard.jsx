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

  // Colors for the pie chart
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

  // Show loading state while fetching data
  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold">Dashboard</h2>
      <p className="text-gray-600 mt-2">Welcome, {adminName}!</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart Section */}
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Data Distribution</h3>
          <PieChart width={300} height={300}>
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
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Data Counts</h3>
          <BarChart width={300} height={300} data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#36A2EB" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;