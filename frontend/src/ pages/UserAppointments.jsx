// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// const statusColor = {
//   Accepted: 'bg-green-100 text-green-700',
//   Rejected: 'bg-red-100 text-red-700',
//   Pending: 'bg-yellow-100 text-yellow-700',
// };

// const UserAppointments = () => {
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`${API_URL}/api/appointments/user`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAppointments(res.data);
//     } catch (err) {
//       console.error('Error fetching user appointments', err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>
//       <div className="space-y-4">
//         {appointments.map((appt) => (
//           <div key={appt._id} className="p-4 border rounded shadow">
//             <p><strong>Doctor:</strong> {appt.doctor?.name}</p>
//             <p><strong>Date:</strong> {appt.date}</p>
//             <p><strong>Time:</strong> {appt.time}</p>
//             <p><strong>Reason:</strong> {appt.reason}</p>
//             <span className={`px-2 py-1 rounded ${statusColor[appt.status]}`}>{appt.status}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserAppointments;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const statusColors = {
  Scheduled: 'text-blue-600',
  Accepted: 'text-green-600',
  Rejected: 'text-red-600',
  Completed: 'text-gray-600',
};

const UserAppointments = ({ token }) => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/appointments/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(res.data);
    } catch (err) {
      setError('Failed to load appointments');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {appointments.length === 0 && <p>No appointments found.</p>}
      <ul>
        {appointments.map(app => (
          <li
            key={app._id}
            className="border p-3 mb-3 rounded shadow flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Doctor:</strong> {app.doctor.name} ({app.doctor.specialization})
              </p>
              <p>
                <strong>Pet:</strong> {app.pet.name}
              </p>
              <p>
                <strong>Date & Time:</strong> {app.date} at {app.time}
              </p>
              <p>
                <strong>Reason:</strong> {app.reason}
              </p>
            </div>
            <div className={`${statusColors[app.status] || ''} font-bold`}>
              {app.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAppointments;
