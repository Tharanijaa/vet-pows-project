import React, { useState } from 'react';
import axios from 'axios';

const AddDogModal = ({ isOpen, onClose, onDogAdded }) => {
  const [form, setForm] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    weight: '',
    healthIssues: '',
    profilePic: ''
  });

  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');

      const payload = {
        ...form,
        age: parseInt(form.age),
        healthIssues: form.healthIssues
          ? form.healthIssues.split(',').map(i => i.trim())
          : [],
        species: 'Dog'
      };

      await axios.post(`${API_URL}/animals/add`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      // Reset form and refresh list
      setForm({
        name: '',
        breed: '',
        age: '',
        gender: '',
        weight: '',
        healthIssues: '',
        profilePic: ''
      });

      onDogAdded();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering dog.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Register New Dog</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" placeholder="Dog Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="breed" placeholder="Breed ID (ObjectId)" value={form.breed} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="age" type="number" placeholder="Age in Months" value={form.age} onChange={handleChange} className="w-full border p-2 rounded" required />
          <select name="gender" value={form.gender} onChange={handleChange} className="w-full border p-2 rounded" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="healthIssues" placeholder="Health Issues (comma-separated)" value={form.healthIssues} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="profilePic" placeholder="Profile Picture URL" value={form.profilePic} onChange={handleChange} className="w-full border p-2 rounded" />

          <div className="flex justify-between pt-2">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDogModal;
