import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`${API_URL}/appointments/doctor/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Failed to load appointments.');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API_URL}/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(appointments.filter((appt) => appt._id !== id));
    } catch (err) {
      console.error('Error deleting appointment:', err);
      setError('Failed to delete appointment.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-orange-800 mb-4">Appointment Management</h2>
      {error && <p className="text-red-600">{error}</p>}

      <table className="min-w-full bg-white border rounded shadow text-sm">
        <thead className="bg-orange-200 text-orange-800">
          <tr>
            <th className="py-2 px-4 border">Doctor</th>
            <th className="py-2 px-4 border">User</th>
            <th className="py-2 px-4 border">Date</th>
            <th className="py-2 px-4 border">Reason</th>
            <th className="py-2 px-4 border">Status</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id} className="text-gray-700">
              <td className="py-2 px-4 border">{appt.doctor?.name || "N/A"}</td>
              <td className="py-2 px-4 border">{appt.owner?.name || "N/A"}</td>
              <td className="py-2 px-4 border">{new Date(appt.date).toLocaleString()}</td>
              <td className="py-2 px-4 border">{appt.reason || "N/A"}</td>
              <td className="py-2 px-4 border">{appt.status}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleDelete(appt._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {appointments.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-400">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentManagement;
