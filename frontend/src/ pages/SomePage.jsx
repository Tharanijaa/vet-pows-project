import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookAppointmentModal from '../components/AppointmentModal';

const API_URL = import.meta.env.VITE_API_URL;

const SomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedVetId, setSelectedVetId] = useState('');
  const [selectedPetId, setSelectedPetId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [doctorRes, petRes] = await Promise.all([
          axios.get(`${API_URL}/doctors`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/pets/mine`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setDoctors(doctorRes.data);
        setPets(petRes.data);
      } catch (err) {
        console.error('❌ Failed to fetch doctors or pets:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Doctor</label>
        <select
          value={selectedVetId}
          onChange={(e) => setSelectedVetId(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">-- Choose Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} ({doc.specialty})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Pet</label>
        <select
          value={selectedPetId}
          onChange={(e) => setSelectedPetId(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="">-- Choose Pet --</option>
          {pets.map((pet) => (
            <option key={pet._id} value={pet._id}>
              {pet.name} ({pet.breed})
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        disabled={!selectedVetId || !selectedPetId}
        className={`px-4 py-2 text-white rounded ${
          !selectedVetId || !selectedPetId
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        Book Doctor Appointment
      </button>

      <BookAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        veterinarianId={selectedVetId}
        petId={selectedPetId}
      />
    </div>
  );
};

export default SomePage;
