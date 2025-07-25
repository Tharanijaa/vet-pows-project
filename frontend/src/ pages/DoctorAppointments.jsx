// src/components/DoctorAppointments.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const DoctorAppointments = ({ token }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/appointments/doctor`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (id, decision) => {
    try {
      await axios.patch(`${API_URL}/appointments/${id}`, { status: decision }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAppointments(); // Refresh list
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update appointment status.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Appointment Requests</h2>
      {appointments.length === 0 ? (
        <p>No appointment requests found.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appt) => (
            <li
              key={appt._id}
              className="border p-4 rounded shadow flex flex-col sm:flex-row justify-between sm:items-center"
            >
              <div>
                <p><strong>Pet:</strong> {appt?.pet?.name || 'Unknown'}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <p><strong>Reason:</strong> {appt.reason}</p>
                <p><strong>Status:</strong> {appt.status}</p>
              </div>

              {appt.status === 'pending' && (
                <div className="flex gap-2 mt-3 sm:mt-0">
                  <button
                    onClick={() => handleDecision(appt._id, 'accepted')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(appt._id, 'rejected')}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorAppointments;
