import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form Submitted!");
    console.log(formData);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/src/assets/login.webp')" }}
    >
      <div className="max-w-md mx-auto p-10 bg-black/40 text-white shadow-2xl rounded-3xl backdrop-blur-md">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Hi! Welcome</h2>
        <p className="text-center mb-4">Let's create an account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email or Phone Number"
            className="w-full p-3 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-3 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">Have an account? <a href="/login" className="text-yellow-500">Log in</a></p>
      </div>
    </div>
  );
};

export default Register;