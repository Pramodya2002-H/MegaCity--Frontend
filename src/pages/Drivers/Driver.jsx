import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Eye, EyeOff, User, Phone, Mail, Key, FileText, Car } from "lucide-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Driver = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  const [step, setStep] = useState(1);
  const [hasCar, setHasCar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    driverName: '',
    email: '',
    driverLicenseNo: '',
    driverPhoneNum: '',
    password: '',
    hasOwnCar: false,
    carLicensePlate: '',
    carBrand: '',
    carModel: '',
    capacity: 4,
    baseRate: 0,
    driverRate: 0,
    carImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'carImage') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (step === 1) {
      if (!formData.driverName.trim()) errors.driverName = "Driver name is required";
      if (!formData.driverLicenseNo.trim()) errors.driverLicenseNo = "Driver license number is required";
      if (!formData.driverPhoneNum.trim()) errors.driverPhoneNum = "Phone number is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))
        errors.email = "Invalid email format";
      if (!formData.password.trim()) errors.password = "Password is required";
    } else if (step === 2 && hasCar) {
      if (!formData.carLicensePlate) errors.carLicensePlate = 'Car License Plate is required';
      if (!formData.carBrand) errors.carBrand = 'Car Brand is required';
      if (!formData.carModel) errors.carModel = 'Car Model is required';
      if (!formData.capacity) errors.capacity = 'Number of Seats is required';
      if (!formData.baseRate) errors.baseRate = 'Base Rate is required';
      if (!formData.driverRate) errors.driverRate = 'Driver Rate is required';
      if (!formData.carImage) errors.carImage = 'Car Image is required';
    }
    return Object.keys(errors).length === 0 ? null : Object.values(errors)[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (step === 1 && hasCar) {
      setStep(2);
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('driverName', formData.driverName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('driverLicenseNo', formData.driverLicenseNo);
      formDataToSend.append('driverPhoneNum', formData.driverPhoneNum);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('hasOwnCar', formData.hasOwnCar);

      if (formData.hasOwnCar) {
        formDataToSend.append('carLicensePlate', formData.carLicensePlate);
        formDataToSend.append('carBrand', formData.carBrand);
        formDataToSend.append('carModel', formData.carModel);
        formDataToSend.append('capacity', formData.capacity);
        formDataToSend.append('baseRate', formData.baseRate);
        formDataToSend.append('driverRate', formData.driverRate);
        if (formData.carImage) {
          formDataToSend.append('carImage', formData.carImage);
        }
      }

      const response = await axios.post(
        'http://localhost:8080/auth/driver/createdriver',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setSuccess('Driver registered successfully! Redirecting to login...');
      
      // Reset form data
      setFormData({
        driverName: '',
        email: '',
        driverLicenseNo: '',
        driverPhoneNum: '',
        password: '',
        hasOwnCar: false,
        carLicensePlate: '',
        carBrand: '',
        carModel: '',
        capacity: 4,
        baseRate: 0,
        driverRate: 0,
        carImage: null,
      });
      
      // Navigate to login page after a short delay
      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000); // 2 second delay to show success message
      
    } catch (error) {
      console.error('Error creating driver:', error);
      setError('Error creating driver. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center p-6 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 z-0"
          style={{ backgroundImage: "url('/src/assets/driver.jpg')" }}
        ></div>
        
        <div className="max-w-md w-full p-8 md:p-10 bg-gray-900 border border-gray-800 shadow-2xl rounded-2xl backdrop-blur-sm z-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 opacity-10 rounded-full translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-500 opacity-10 rounded-full -translate-x-12 translate-y-12"></div>
          
          <div className="relative">
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                <Car size={28} className="text-gray-900" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-2 text-center text-white">Driver Registration</h2>
            <p className="text-center mb-8 text-gray-400">Join our professional driver network today</p>

            {success && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-500 text-green-400 rounded-lg flex items-start">
                <div className="mr-3 mt-0.5 text-green-500">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>{success}</span>
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-500 text-red-400 rounded-lg flex items-start">
                <div className="mr-3 mt-0.5 text-red-500">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        name="driverName"
                        value={formData.driverName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">License Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText size={18} className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        name="driverLicenseNo"
                        value={formData.driverLicenseNo}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                        placeholder="Enter your license number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={18} className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        name="driverPhoneNum"
                        value={formData.driverPhoneNum}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={18} className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Key size={18} className="text-gray-500" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-10 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox"
                        name="hasOwnCar"
                        checked={formData.hasOwnCar}
                        onChange={(e) => {
                          setHasCar(e.target.checked);
                          handleInputChange(e);
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      <span className="ml-3 text-sm font-medium text-gray-300">I have my own car</span>
                    </label>
                  </div>
                </>
              )}

              {step === 2 && hasCar && (
                <>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Car License Plate</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Car size={18} className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        name="carLicensePlate"
                        value={formData.carLicensePlate}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                        placeholder="Enter license plate"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Car Brand</label>
                    <input
                      type="text"
                      name="carBrand"
                      value={formData.carBrand}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                      placeholder="e.g., Toyota"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Car Model</label>
                    <input
                      type="text"
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                      placeholder="e.g., Corolla"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Number of Seats</label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                      placeholder="e.g., 4"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Base Rate (LKR)</label>
                    <input
                      type="number"
                      name="baseRate"
                      value={formData.baseRate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                      placeholder="e.g., 500"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Driver Rate (LKR/km)</label>
                    <input
                      type="number"
                      name="driverRate"
                      value={formData.driverRate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                      placeholder="e.g., 50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Car Image</label>
                    <input
                      type="file"
                      name="carImage"
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-white placeholder-gray-500"
                    />
                  </div>
                </>
              )}

              <div className="pt-4 flex gap-4">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full py-3.5 px-6 rounded-lg font-semibold text-base bg-gray-700 text-white hover:bg-gray-600 transition-all"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 px-6 rounded-lg font-semibold text-base transition-all duration-300 relative overflow-hidden group ${
                    loading
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 text-gray-900 hover:bg-yellow-600 shadow-lg"
                  }`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-gray-400"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">
                        {step === 1 ? 'Continue' : 'Register as Driver'}
                      </span>
                      <span className="absolute bottom-0 left-0 w-0 h-full bg-yellow-600 transition-all duration-300 group-hover:w-full -z-0"></span>
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-center text-xs text-gray-500 mt-6">
                By registering, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Driver;