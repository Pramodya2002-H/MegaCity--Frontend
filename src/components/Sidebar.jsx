import { FaUser, FaChartBar, FaBell, FaCog, FaHome, FaBox } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700">AdminPanel</h2>
      <ul className="flex-1">
        <li className="p-4 flex items-center space-x-2 hover:bg-gray-800">
          <FaHome />
          <span>Dashboard</span>
        </li>
        <li className="p-4 flex items-center space-x-2 hover:bg-gray-800">
          <FaUser />
          <span>Users</span>
        </li>
        <li className="p-4 flex items-center space-x-2 hover:bg-gray-800">
          <FaChartBar />
          <span>Analytics</span>
        </li>
        <li className="p-4 flex items-center space-x-2 hover:bg-gray-800">
          <FaBox />
          <span>Content</span>
        </li>
        <li className="p-4 flex items-center space-x-2 hover:bg-gray-800">
          <FaBell />
          <span>Notifications</span>
        </li>
        <li className="p-4 flex items-center space-x-2 hover:bg-gray-800">
          <FaCog />
          <span>Settings</span>
        </li>
      </ul>
      <div className="p-4 border-t border-gray-700 flex items-center space-x-2">
        <div className="bg-green-500 text-white w-8 h-8 flex items-center justify-center rounded-full">
          JD
        </div>
        <div>
          <p>John Doe</p>
          <p className="text-sm text-gray-400">Administrator</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
