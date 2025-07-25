
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const DoctorService = () => {
  const { state } = useLocation();
  const dogId = state?.dogId;

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // Fetch list of doctors (correct endpoint)
    const fetchDoctors = async () => {
      try {
        // Remove duplicate /api if present in API_URL
        const url = API_URL.endsWith('/api') ? `${API_URL}/veterinarians` : `${API_URL}/api/veterinarians`;
        const token = localStorage.getItem('token');
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/appointments`, {
        dogId,
        doctorId: selectedDoctor,
        date: appointmentDate,
        time: appointmentTime
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ Appointment booked successfully!");
    } catch (err) {
      console.error("Appointment booking failed:", err);
      setMessage("❌ Failed to book appointment. Try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Doctor Appointment</h2>

      {message && <p className="mb-4 text-green-600 font-semibold">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <p><strong>Dog ID:</strong> {dogId}</p>

        <label className="block">
          Select Doctor:
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            required
          >
            <option value="">-- Select a Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} - {doc.specialization}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Select Date:
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            required
          />
        </label>

        <label className="block">
          Select Time:
          <input
            type="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🩺 Book Appointment
        </button>
      </form>
    </div>
  );
};

export default DoctorService;
