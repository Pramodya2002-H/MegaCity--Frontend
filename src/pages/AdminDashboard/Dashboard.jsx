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

const Dashboard = () => {
  const [active, setActive] = useState("dashboard");
  const [adminName, setAdminName] = useState("Loading...");
  const [customers, setCustomers] = useState([]);
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
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  // Fetch all customers when "Users" is clicked
  useEffect(() => {
    if (active !== "users") return; // Only fetch customers when "Users" is active

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

  if (loading && active === "dashboard") {
    return (
      <div className="flex h-screen bg-gray-100 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
          <p className="mt-4 text-bg-linear-to-r from-gray-300 via-yellow-500 to-amber-400 font-medium">Loading admin details...</p>
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
        {/* Default Dashboard Content */}
        {active === "dashboard" && (
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-semibold">Dashboard</h2>
            <p className="text-gray-600 mt-2">Welcome, {adminName}!</p>
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