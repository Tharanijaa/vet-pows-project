// src/pages/DogManagement.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const DogManagement = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${API_URL}/animals/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDogs(res.data);
      } catch (err) {
        console.error('Failed to fetch dogs', err);
      }
    };

    fetchDogs();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-orange-700">🐾 Dog Management</h1>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Registered Dogs</h2>
        <table className="w-full table-auto text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Breed</th>
              <th className="p-2">Age</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Owner</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog) => (
              <tr key={dog._id} className="border-t">
                <td className="p-2 font-medium">{dog.name}</td>
                <td className="p-2">{typeof dog.breed === 'object' ? dog.breed.breed : dog.breed}</td>
                <td className="p-2">{dog.age} months</td>
                <td className="p-2">{dog.gender}</td>
                <td className="p-2">{dog.owner?.name || '-'}</td>
                <td className="p-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DogManagement;
