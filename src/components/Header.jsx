import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <nav className="bg-#030712 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">MegaCityCab</h1>

      <ul className="flex space-x-6">
        <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
        <li><Link to="/drivers" className="hover:text-gray-300">Drivers</Link></li>
        <li><Link to="/aboutUs" className="hover:text-gray-300">About Us</Link></li>        
        <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
        
      </ul>

      <div className="space-x-3">
        
        <Link to="/login" className="px-4 py-2 bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-600 rounded-md hover:bg-blue-600 transition">Login</Link>
      </div>
    </nav>
  );
};

export default Header;