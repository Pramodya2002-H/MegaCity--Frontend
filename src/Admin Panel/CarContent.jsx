import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirecting after logout

const API_BASE_URL = 'http://localhost:8080';

const CarDashboard = () => {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    licensePlate: '',
    capacity: 4,
    baseRate: 0,
    driverRate: 0,
    categoryId: '',
    carImage: null,
    available: true,
    assignedDriverId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchCars();
  }, []);

  const getToken = () => localStorage.getItem('jwtToken');

  const fetchCars = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error('No token found');
      const response = await axios.get(`${API_BASE_URL}/auth/cars/car`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const carsWithDefaults = response.data.map(car => ({
        carId: car.carId,
        brand: car.brand || 'Unknown Brand',
        model: car.model || 'Unknown Model',
        licensePlate: car.licensePlate || 'Unknown License Plate',
        capacity: car.capacity || 4,
        baseRate: car.baseRate || 0,
        driverRate: car.driverRate || 0,
        categoryId: car.categoryId || '',
        carImage: car.carImage || '',
        available: car.available !== undefined ? car.available : false,
        assignedDriverId: car.assignedDriverId || null
      }));
      setCars(carsWithDefaults);
      setError(null);
    } catch (err) {
      setError('Failed to fetch cars. Please try again later.');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
      setErrors(prev => ({ ...prev, [name]: '' }));
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
      setErrors(prev => ({ ...prev, [name]: '' }));
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: parseFloat(value) || value });
      setErrors(prev => ({ ...prev, [name]: '' }));
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddNew = () => {
    setFormData({
      brand: '',
      model: '',
      licensePlate: '',
      capacity: 4,
      baseRate: 0,
      driverRate: 0,
      categoryId: '',
      carImage: null,
      available: true,
      assignedDriverId: ''
    });
    setIsEditing(false);
    setShowForm(true);
    setErrors({});
  };

  const handleEdit = (car) => {
    setFormData({
      brand: car.brand || '',
      model: car.model || '',
      licensePlate: car.licensePlate || '',
      capacity: car.capacity || 4,
      baseRate: car.baseRate || 0,
      driverRate: car.driverRate || 0,
      categoryId: car.categoryId || '',
      carImage: car.carImage || null,
      available: car.available !== undefined ? car.available : true,
      assignedDriverId: car.assignedDriverId || ''
    });
    setCurrentCar(car);
    setIsEditing(true);
    setShowForm(true);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.licensePlate.trim()) newErrors.licensePlate = 'License Plate is required';
    if (!formData.capacity || formData.capacity <= 0) newErrors.capacity = 'Capacity must be a positive number';
    if (formData.baseRate === '' || formData.baseRate < 0) newErrors.baseRate = 'Base Rate must be a non-negative number';
    if (formData.driverRate === '' || formData.driverRate < 0) newErrors.driverRate = 'Driver Rate must be a non-negative number';
    if (!isEditing && !formData.carImage) newErrors.carImage = 'Car Image is required for new cars';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const token = getToken();
      if (!token) throw new Error('No token found');

      if (isEditing) {
        const updateData = {
          brand: formData.brand,
          model: formData.model,
          licensePlate: formData.licensePlate,
          capacity: formData.capacity,
          baseRate: formData.baseRate,
          driverRate: formData.driverRate,
          categoryId: formData.categoryId,
          carImage: formData.carImage || currentCar.carImage,
          available: formData.available,
          assignedDriverId: formData.assignedDriverId
        };

        const response = await axios.put(
          `${API_BASE_URL}/auth/cars/updateCar/${currentCar.carId}`,
          updateData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        setCars(cars.map(car => car.carId === currentCar.carId ? response.data : car));
        alert('Car details updated successfully!');
      } else {
        const formDataObj = new FormData();
        formDataObj.append('brand', formData.brand);
        formDataObj.append('model', formData.model);
        formDataObj.append('licensePlate', formData.licensePlate);
        formDataObj.append('capacity', formData.capacity);
        formDataObj.append('baseRate', formData.baseRate);
        formDataObj.append('driverRate', formData.driverRate);
        formDataObj.append('categoryId', formData.categoryId);
        formDataObj.append('carImage', formData.carImage);
        formDataObj.append('available', formData.available);
        formDataObj.append('assignedDriverId', formData.assignedDriverId || '');

        const response = await axios.post(
          `${API_BASE_URL}/auth/cars/createCar`,
          formDataObj,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        setCars([...cars, response.data]);
        alert('Car created successfully!');
      }
      setShowForm(false);
      setFormData({
        brand: '',
        model: '',
        licensePlate: '',
        capacity: 4,
        baseRate: 0,
        driverRate: 0,
        categoryId: '',
        carImage: null,
        available: true,
        assignedDriverId: ''
      });
      setIsEditing(false);
    } catch (err) {
      setError(isEditing ? 'Failed to update car.' : 'Failed to create car.');
      console.error('Error:', err);
      alert(isEditing ? 'Failed to update car. Please try again.' : 'Failed to create car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setLoading(true);
      try {
        const token = getToken();
        await axios.delete(`${API_BASE_URL}/auth/cars/${carId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCars(cars.filter(car => car.carId !== carId));
        setError(null);
      } catch (err) {
        setError('Failed to delete car.');
        console.error('Error deleting car:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      brand: '',
      model: '',
      licensePlate: '',
      capacity: 4,
      baseRate: 0,
      driverRate: 0,
      categoryId: '',
      carImage: null,
      available: true,
      assignedDriverId: ''
    });
    setIsEditing(false);
    setErrors({});
  };

  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem('jwtToken');
    // Reset component state
    setCars([]);
    setShowForm(false);
    setCurrentCar(null);
    setIsEditing(false);
    setFormData({
      brand: '',
      model: '',
      licensePlate: '',
      capacity: 4,
      baseRate: 0,
      driverRate: 0,
      categoryId: '',
      carImage: null,
      available: true,
      assignedDriverId: ''
    });
    setLoading(false);
    setError(null);
    setErrors({});
    // Redirect to login page
    navigate('/login'); // Adjust the route as per your app's routing
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500">Car Management</h1>
          <div className="space-x-4">
            <button
              onClick={handleAddNew}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 disabled:bg-yellow-400 shadow-md"
              disabled={loading}
            >
              Add New Car
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md"
            >
              Logout
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {showForm && (
          <div className="bg-gray-800 rounded-xl shadow-md p-6 mb-8 border border-gray-700">
            <h2 className="text-xl font-bold text-yellow-500 mb-6">
              {isEditing ? 'Update Car' : 'Add New Car'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-yellow-500 mb-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.brand ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                    required
                  />
                  {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500 mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.model ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                    required
                  />
                  {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500 mb-1">License Plate</label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.licensePlate ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                    required
                  />
                  {errors.licensePlate && <p className="text-red-500 text-xs mt-1">{errors.licensePlate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500 mb-1">Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.capacity ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                    required
                    min="1"
                  />
                  {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500 mb-1">Base Rate</label>
                  <input
                    type="number"
                    name="baseRate"
                    value={formData.baseRate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.baseRate ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                    step="0.01"
                    min="0"
                  />
                  {errors.baseRate && <p className="text-red-500 text-xs mt-1">{errors.baseRate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500 mb-1">Driver Rate</label>
                  <input
                    type="number"
                    name="driverRate"
                    value={formData.driverRate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.driverRate ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                    step="0.01"
                    min="0"
                  />
                  {errors.driverRate && <p className="text-red-500 text-xs mt-1">{errors.driverRate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500 mb-1">Category ID</label>
                  <input
                    type="text"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-yellow-500 mb-1">Car Image</label>
                  <input
                    type="file"
                    name="carImage"
                    onChange={handleInputChange}
                    className={`w-full py-2 text-white ${errors.carImage ? 'border-red-500' : ''}`}
                    accept="image/*"
                    required={!isEditing}
                  />
                  {isEditing && formData.carImage && (
                    <p className="text-xs text-gray-400 mt-1">Current: {formData.carImage}</p>
                  )}
                  {errors.carImage && <p className="text-red-500 text-xs mt-1">{errors.carImage}</p>}
                </div>
                {isEditing && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-yellow-500 mb-1">Assigned Driver ID</label>
                      <input
                        type="text"
                        name="assignedDriverId"
                        value={formData.assignedDriverId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="available"
                        checked={formData.available}
                        onChange={handleInputChange}
                        className="h-5 w-5 text-yellow-500 border-gray-600 rounded focus:ring-2 focus:ring-yellow-500"
                      />
                      <label className="ml-3 text-sm font-medium text-yellow-500">Available</label>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 disabled:bg-yellow-400 shadow-md font-semibold"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : isEditing ? 'Submit Update' : 'Add Car'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-500 shadow-md"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {!showForm && (
          <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                      Brand
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                      License Plate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {cars.length > 0 ? (
                    cars.map((car) => (
                      <tr key={car.carId} className="hover:bg-gray-750">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold">
                              {car.brand ? car.brand.charAt(0) : ''}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{car.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{car.model}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{car.licensePlate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{car.capacity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {car.available ? 'Available' : 'Assigned'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleEdit(car)}
                            className="text-yellow-500 hover:text-yellow-600 mr-4 disabled:text-gray-400"
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(car.carId)}
                            className="text-red-500 hover:text-red-600 disabled:text-gray-400"
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                        {loading ? 'Loading...' : 'No cars available'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDashboard;