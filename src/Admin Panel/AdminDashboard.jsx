import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const AdminDashboard = ({ adminName }) => {
  // State for storing the fetched data
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Manual daily bookings data (you can adjust these values)
  const dailyBookingsData = [
    { day: "Mon", bookings: 15 },
    { day: "Tue", bookings: 20 },
    { day: "Wed", bookings: 18 },
    { day: "Thu", bookings: 25 },
    { day: "Fri", bookings: 30 },
    { day: "Sat", bookings: 22 },
    { day: "Sun", bookings: 17 },
  ];

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersResponse = await fetch("http://localhost:8080/auth/customers/viewCustomers");
        const customersData = await customersResponse.json();
        setCustomers(customersData);

        const driversResponse = await fetch("http://localhost:8080/auth/driver/getalldrivers");
        const driversData = await driversResponse.json();
        setDrivers(driversData);

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
  }, []);

  // Prepare data for the pie chart
  const pieChartData = [
    { name: "Customers", value: customers.length },
    { name: "Drivers", value: drivers.length },
    { name: "Cars", value: cars.length },
  ];

  // Colors for the pie chart
  const COLORS = ["#FFD700", "#FFA500", "#FF8C00"];

  if (loading) {
    return <div className="text-white">Loading dashboard data...</div>;
  }

  return (
    <div className="bg-black text-white p-6 min-h-screen">
      <h2 className="text-3xl font-semibold text-yellow-500">Dashboard</h2>
      <p className="text-gray-400 mt-2">Welcome, {adminName}!</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart Section */}
        <div className="bg-gray-900 p-4 border border-yellow-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
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
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#1e1e1e", 
                border: "1px solid #FFD700", 
                color: "#FFD700",
                borderRadius: "4px"
              }} 
            />
            <Legend wrapperStyle={{ color: "#FFD700" }} />
          </PieChart>
        </div>

        {/* Daily Bookings Area Chart Section */}
        <div className="bg-gray-900 p-4 border border-yellow-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-4 text-yellow-500">Weekly Booking Trends</h3>
          <AreaChart
            width={300}
            height={300}
            data={dailyBookingsData}
            margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FFD700" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#FFD700" 
              opacity={0.2}
            />
            <XAxis 
              dataKey="day" 
              stroke="#FFD700"
              tick={{ fill: "#FFD700", fontSize: 12 }}
            />
            <YAxis 
              stroke="#FFD700"
              tick={{ fill: "#FFD700", fontSize: 12 }}
              domain={[0, 'auto']}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "#1e1e1e",
                border: "1px solid #FFD700",
                color: "#FFD700",
                borderRadius: "4px",
                padding: "8px"
              }}
              cursor={{ stroke: "#FFD700", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="bookings"
              stroke="#FFD700"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorBookings)"
              activeDot={{ r: 6, fill: "#FFD700", stroke: "#1e1e1e", strokeWidth: 2 }}
            />
          </AreaChart>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;