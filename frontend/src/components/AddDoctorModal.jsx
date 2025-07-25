// Cleaned: 2025-07-24
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AddDoctorModal = ({ isOpen, onClose, onDoctorAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialization: '',
    experience: '',
    clinicName: '',
    availability: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${API_URL}/veterinarians`, {
        ...formData,
        role: 'veterinarian',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Doctor added successfully");
      setFormData({
        name: '',
        email: '',
        password: '',
        specialization: '',
        experience: '',
        clinicName: '',
        availability: '',
      });
      onDoctorAdded && onDoctorAdded(); // refresh list if provided
      onClose && onClose();       // close modal if provided
    } catch (err) {
      console.error("Error adding doctor:", err);
      alert("Failed to add doctor");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-orange-700 mb-4">Add New Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Doctor Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g. Surgery, General)"
            value={formData.specialization}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          <input
            type="number"
            name="experience"
            placeholder="Experience (in years)"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          <input
            type="text"
            name="clinicName"
            placeholder="Clinic Name"
            value={formData.clinicName}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
          <input
            type="text"
            name="availability"
            placeholder="Availability (e.g. Mon–Fri, 9am–5pm)"
            value={formData.availability}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;
