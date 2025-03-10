import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiBell,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const Dashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [adminName, setAdminName] = useState("Loading...");
  const [customers, setCustomers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch admin details from the database
  useEffect(() => {
    const fetchAdminDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/auth/admin/viewAdmin/67cc11e0307524734f974764"
        );
        if (!response.ok) throw new Error("Failed to fetch admin details");
        const data = await response.json();
        setAdminName(data.name || "Admin");
      } catch (error) {
        console.error("Error fetching admin details:", error);
        setError("Unable to load admin details. Please try again.");
        setAdminName("Unknown Admin");
      }
    };

    fetchAdminDetails();
  }, []);

  // Fetch customers, drivers, and cars when "Dashboard" is active
  useEffect(() => {
    if (active !== "dashboard") return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Customers
        const customersResponse = await fetch("http://localhost:8080/auth/customers/viewCustomers", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!customersResponse.ok) throw new Error("Failed to fetch customers");
        const customersData = await customersResponse.json();
        setCustomers(customersData);

        // Fetch Drivers
        const driversResponse = await fetch("http://localhost:8080/auth/driver/getalldrivers", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!driversResponse.ok) throw new Error("Failed to fetch drivers");
        const driversData = await driversResponse.json();
        setDrivers(driversData);

        // Fetch Cars
        const carsResponse = await fetch("http://localhost:8080/auth/cars/car", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!carsResponse.ok) throw new Error("Failed to fetch cars");
        const carsData = await carsResponse.json();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Unable to load dashboard data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [active]);

  // Fetch all customers when "Users" is clicked
  useEffect(() => {
    if (active !== "users") return;

    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/auth/customers/viewCustomers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if required
            // ...(token && { Authorization: `Bearer ${token}` }),
          },
          credentials: "include",
        });
        if (!response.ok) throw new Error(`Failed to fetch customers: ${response.status}`);
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError("Unable to load customers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [active]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  // Prepare data for Pie Chart
  const pieChartData = [
    { name: "Customers", value: customers.length },
    { name: "Drivers", value: drivers.length },
    { name: "Cars", value: cars.length },
  ];

  // Prepare data for Bar Chart
  const barChartData = [
    { name: "Customers", count: customers.length },
    { name: "Drivers", count: drivers.length },
    { name: "Cars", count: cars.length },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

  if (loading && active === "dashboard") {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
          <p className="mt-4 text-green-400 font-medium">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error && active === "dashboard") {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] text-white p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-green-400 mb-8">AdminPanel</h1>
          <nav>
            <ul>
              <li className="mb-4">
                <button
                  onClick={() => setActive("dashboard")}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg ${
                    active === "dashboard" ? "bg-green-500" : "hover:bg-gray-700"
                  }`}
                >
                  <FiHome />
                  Dashboard
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActive("users")}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg ${
                    active === "users" ? "bg-green-500" : "hover:bg-gray-700"
                  }`}
                >
                  <FiUsers />
                  Users
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActive("analytics")}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg ${
                    active === "analytics" ? "bg-green-500" : "hover:bg-gray-700"
                  }`}
                >
                  <FiBarChart2 />
                  Analytics
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActive("content")}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg ${
                    active === "content" ? "bg-green-500" : "hover:bg-gray-700"
                  }`}
                >
                  <FiFileText />
                  Content
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActive("notifications")}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg ${
                    active === "notifications" ? "bg-green-500" : "hover:bg-gray-700"
                  }`}
                >
                  <FiBell />
                  Notifications
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActive("settings")}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg ${
                    active === "settings" ? "bg-green-500" : "hover:bg-gray-700"
                  }`}
                >
                  <FiSettings />
                  Settings
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="border-t border-gray-600 pt-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 w-10 h-10 flex items-center justify-center rounded-full text-black font-bold">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold">{adminName}</h3>
              <p className="text-sm text-gray-400">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 mt-4 w-full p-2 rounded-lg hover:bg-red-500"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-8 flex justify-center items-start">
        {/* Dashboard Content with Charts */}
        {active === "dashboard" && (
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-semibold">Dashboard</h2>
            <p className="text-gray-600 mt-2">Welcome, {adminName}!</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart for Data Distribution */}
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

              {/* Bar Chart for Data Counts */}
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
        )}

        {/* Users Content (Customer List) */}
        {active === "users" && (
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-semibold">Users</h2>
            <p className="text-gray-600 mt-2">View all customers in the system.</p>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">All Customers</h3>
              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-400"></div>
                </div>
              )}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && !error && customers.length === 0 && (
                <p className="text-gray-500">No customers found.</p>
              )}
              {!loading && !error && customers.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100 text-left text-gray-600">
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                        <th className="py-2 px-4 border-b">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer) => (
                        <tr key={customer._id || customer.customerId} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{customer.name || "N/A"}</td>
                          <td className="py-2 px-4 border-b">{customer.email || "N/A"}</td>
                          <td className="py-2 px-4 border-b">{customer.phone || "N/A"}</td>
                          <td className="py-2 px-4 border-b">{customer.address || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Placeholder Content for Other Sections */}
        {active === "analytics" && (
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-semibold">Analytics</h2>
            <p className="text-gray-600 mt-2">Analytics section coming soon!</p>
          </div>
        )}
        {active === "content" && (
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-semibold">Content</h2>
            <p className="text-gray-600 mt-2">Content section coming soon!</p>
          </div>
        )}
        {active === "notifications" && (
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-semibold">Notifications</h2>
            <p className="text-gray-600 mt-2">Notifications section coming soon!</p>
          </div>
        )}
        {active === "settings" && (
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-semibold">Settings</h2>
            <p className="text-gray-600 mt-2">Settings section coming soon!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;