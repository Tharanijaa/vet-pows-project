import React, { useState, useEffect } from 'react';
import AddDogModal from '../components/AddDogModal.jsx';
import DogCard from '../components/DogCard.jsx';
import VaccinationCard from '../components/ VaccinationCard.jsx'

const API_URL = import.meta.env.VITE_API_URL;

const DogDashboard = () => {
  const [dogs, setDogs] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const fetchDogs = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${API_URL}/animals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setDogs(data);
    } catch (err) {
      console.error('Failed to load dogs', err);
      setError('Failed to load dog data.');
    }
  };

  const fetchVaccinations = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${API_URL}/vaccinations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setVaccinations(data);
    } catch (err) {
      console.error('Failed to load vaccinations', err);
    }
  };

  useEffect(() => {
    fetchDogs();
    fetchVaccinations();
  }, []);

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      {/* --- top section --- */}
      <h1 className="text-3xl font-bold text-orange-700 mb-4">🐾 PetCare Dashboard</h1>

      {/* --- CTA cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-500 text-white rounded-lg shadow p-4 flex flex-col items-center">
          <p className="text-xl font-semibold">Add New Dog</p>
          <p className="text-sm">Register your dog with premium services</p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-green-600 font-bold py-1 px-2 rounded mt-2"
          >
            ₹500 + 2 Months FREE
          </button>
        </div>
        <div className="bg-purple-500 text-white rounded-lg shadow p-4 text-center">
          <p className="text-xl font-semibold">Food Shop</p>
          <p className="text-sm">Free Recommendations</p>
        </div>
        <div className="bg-blue-500 text-white rounded-lg shadow p-4 text-center">
          <p className="text-xl font-semibold">Appointments</p>
          <p className="text-sm">0 Upcoming</p>
        </div>
        <div className="bg-pink-500 text-white rounded-lg shadow p-4 text-center">
          <p className="text-xl font-semibold">Health Records</p>
          <p className="text-sm">3 Due</p>
        </div>
      </div>

      {/* --- Add Dog Modal --- */}
      <AddDogModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onDogAdded={fetchDogs}
      />

      {/* --- Dog list --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">🐶 Your Dogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dogs.map((dog) => (
              <DogCard key={dog._id} dog={dog} />
            ))}
          </div>
        </div>

        {/* --- Vaccination section --- */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">💉 Vaccinations</h2>
            <div className="bg-white rounded shadow p-4">
              {vaccinations.slice(0, 3).map((vaccine) => (
                <VaccinationCard key={vaccine._id} vaccine={vaccine} />
              ))}
              <button className="mt-3 text-indigo-600 hover:underline text-sm">View All</button>
            </div>
          </div>

          {/* --- Appointments --- */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">📅 Appointments</h2>
            <div className="bg-white rounded shadow p-4 text-center text-gray-600">
              No upcoming appointments
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default DogDashboard;
