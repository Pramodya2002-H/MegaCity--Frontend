import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      id: "driverDashboard",
      icon: <Users size={20} />,
      label: "Drivers",
      path: "/admin/driverContent",
    },
    {
      id: "cars",
      icon: <Car size={20} />,
      label: "Cars",
      path: "/admin/carContent",
    },
    {
      id: "bookings",
      icon: <Calendar size={20} />, // Use the Calendar icon for bookings
      label: "Bookings",
      path: "/admin/bookingContent", // Path to the BookingContent component
    },
    {
      id: "analytics",
      icon: <BarChart3 size={20} />,
      label: "Analytics",
      path: "/analytics",
    },
    {
      id: "settings",
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    },
  ];

  const handleItemClick = (id) => {
    setActiveItem(id);
  };

  return (
    <aside className="w-64 min-h-screen bg-black text-white flex flex-col">
      {/* Brand/Logo Section */}
      <div className="p-5 border-b border-yellow-500 flex items-center">
        <div className="h-8 w-8 rounded-md bg-yellow-500 flex items-center justify-center font-bold text-black">
          A
        </div>
        <span className="ml-3 font-semibold text-lg">AdminPanel</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-5 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.path}
                className={`w-full flex items-center px-4 py-3 rounded-md transition-colors ${
                  activeItem === item.id
                    ? "bg-yellow-500 text-black"
                    : "text-gray-300 hover:bg-yellow-500 hover:text-black"
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
                {activeItem === item.id && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-black"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-yellow-500">
        <div className="flex items-center justify-between mb-3">
          <div className="relative">
            <Bell
              size={20}
              className="text-gray-300 hover:text-yellow-500 cursor-pointer"
            />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-500 rounded-full flex items-center justify-center text-[10px] font-medium text-black">
              3
            </span>
          </div>
          <button className="text-gray-300 hover:text-yellow-500">
            <LogOut size={20} />
          </button>
        </div>
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User profile"
            className="h-10 w-10 rounded-full border-2 border-yellow-500"
          />
          <div className="ml-3">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;