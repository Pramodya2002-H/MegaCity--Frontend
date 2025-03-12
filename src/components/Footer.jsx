import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-#030712 text-white py-6 mt-10">
        
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="aboutUs" className="text-gray-400 hover:text-yellow-400">About Us</a></li>
        <li><a href="services" className="text-gray-400 hover:text-yellow-400">Our Services</a></li>
        <li><a href="contactUs" className="text-gray-400 hover:text-yellow-400">Contact Us</a></li>
      </ul>
    </div>
    {/* Contact Us */}
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <p className="text-gray-400">Phone: +91 42 44 727</p>
        <p className="text-gray-400">Email: megacitycabservice@gmail.com</p>
        <p className="text-gray-400">Address: No.10, Temple Road, Colombo </p>
    </div>

    {/*Rights showing */}
    <div className="flex space-x-4">
            <FaFacebook className="text-xl hover:text-blue-500 transition duration-300" />
            <FaTwitter className="text-xl hover:text-blue-400 transition duration-300" />
            <FaInstagram className="text-xl hover:text-pink-500 transition duration-300" />
          </div>
    </div>
    <div className="container mx-auto px-2 bg-gray-900 py-4 flex justify-center items-center h-8">
  <p className="text-sm font-bold text-gray-950">© 2025 MegaCity. All rights reserved.</p>
</div>
    </footer>
  );
};

export default Footer;