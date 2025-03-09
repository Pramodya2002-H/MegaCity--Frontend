import { Link } from "react-router-dom";

const DriverDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-900 h-screen p-4 text-white">
        <h1 className="text-2xl font-bold mb-6">Driver Dashboard</h1>
        <ul>
          <li className="mb-3">
            <Link to="/driver-home" className="hover:text-gray-400">Home</Link>
          </li>
          <li className="mb-3">
            <Link to="/driver-rides" className="hover:text-gray-400">My Rides</Link>
          </li>
          <li className="mb-3">
            <Link to="/driver-earnings" className="hover:text-gray-400">Earnings</Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-semibold">Welcome, Driver!</h1>
        <div className="grid grid-cols-3 gap-4 mt-6">
          {/* Ride Requests */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-bold">New Ride Requests</h2>
            <p>Check for incoming rides.</p>
          </div>
          {/* Earnings Summary */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-bold">Earnings</h2>
            <p>Today's Earnings: $150</p>
          </div>
          {/* Profile Summary */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-bold">Profile</h2>
            <p>John Doe | Toyota Prius</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;