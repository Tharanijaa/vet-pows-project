// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// const DoctorManagement = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const res = await axios.get(`${API_URL}/veterinarians`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDoctors(res.data);
//     } catch (err) {
//       console.error('Failed to fetch doctors:', err);
//       setError('Unable to load doctor data.');
//     }
//   };

//   const handleDelete = async (doctorId) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.delete(`${API_URL}/veterinarians/${doctorId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDoctors(doctors.filter((doc) => doc._id !== doctorId));
//     } catch (err) {
//       console.error('Error deleting doctor:', err);
//       setError('Failed to delete doctor.');
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold text-orange-800 mb-4">Doctor Management</h2>
//       {error && <p className="text-red-600">{error}</p>}

//       <table className="min-w-full bg-white border rounded shadow">
//         <thead className="bg-orange-200 text-orange-800">
//           <tr>
//             <th className="py-2 px-4 border">Name</th>
//             <th className="py-2 px-4 border">Specialization</th>
//             <th className="py-2 px-4 border">Experience (years)</th>
//             <th className="py-2 px-4 border">Clinic</th>
//             <th className="py-2 px-4 border">Availability</th>
//             <th className="py-2 px-4 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.map((doc) => (
//             <tr key={doc._id} className="text-sm text-gray-700">
//               <td className="py-2 px-4 border">{doc.name}</td>
//               <td className="py-2 px-4 border">{doc.specialization || 'N/A'}</td>
//               <td className="py-2 px-4 border">{doc.experience || 0}</td>
//               <td className="py-2 px-4 border">{doc.clinicName || 'N/A'}</td>
//               <td className="py-2 px-4 border">{doc.availability || 'N/A'}</td>
//               <td className="py-2 px-4 border">
//                 <button
//                   onClick={() => handleDelete(doc._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {doctors.length === 0 && (
//             <tr>
//               <td colSpan="6" className="text-center py-4 text-gray-400">
//                 No doctors found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DoctorManagement;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import AddDoctorModal from '../components/AddDoctorModal'; // Make sure this file exists

// const API_URL = import.meta.env.VITE_API_URL;

// const DoctorManagement = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false); // 🆕 modal visibility state

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const res = await axios.get(`${API_URL}/veterinarians`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDoctors(res.data);
//     } catch (err) {
//       console.error('Failed to fetch doctors:', err);
//       setError('Unable to load doctor data.');
//     }
//   };

//   const handleDelete = async (doctorId) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.delete(`${API_URL}/veterinarians/${doctorId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setDoctors(doctors.filter((doc) => doc._id !== doctorId));
//     } catch (err) {
//       console.error('Error deleting doctor:', err);
//       setError('Failed to delete doctor.');
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold text-orange-800">Doctor Management</h2>
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
//         >
//           + Add Doctor
//         </button>
//       </div>

//       {error && <p className="text-red-600 mb-2">{error}</p>}

//       <table className="min-w-full bg-white border rounded shadow">
//         <thead className="bg-orange-200 text-orange-800">
//           <tr>
//             <th className="py-2 px-4 border">Name</th>
//             <th className="py-2 px-4 border">Specialization</th>
//             <th className="py-2 px-4 border">Experience (years)</th>
//             <th className="py-2 px-4 border">Clinic</th>
//             <th className="py-2 px-4 border">Availability</th>
//             <th className="py-2 px-4 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {doctors.map((doc) => (
//             <tr key={doc._id} className="text-sm text-gray-700">
//               <td className="py-2 px-4 border">{doc.name}</td>
//               <td className="py-2 px-4 border">{doc.specialization || 'N/A'}</td>
//               <td className="py-2 px-4 border">{doc.experience || 0}</td>
//               <td className="py-2 px-4 border">{doc.clinicName || 'N/A'}</td>
//               <td className="py-2 px-4 border">{doc.availability || 'N/A'}</td>
//               <td className="py-2 px-4 border">
//                 <button
//                   onClick={() => handleDelete(doc._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {doctors.length === 0 && (
//             <tr>
//               <td colSpan="6" className="text-center py-4 text-gray-400">
//                 No doctors found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Add Doctor Modal */}
//       <AddDoctorModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         onDoctorAdded={fetchDoctors}
//       />
//     </div>
//   );
// };// src/pages/DoctorManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddDoctorModal from '../components/AddDoctorModal';

const API_URL = import.meta.env.VITE_API_URL;

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // for delete button loading state

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found. Please login.');

      const response = await axios.get(`${API_URL}/veterinarians`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch doctors.');
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [refreshToggle]);

  const handleDelete = async (doctorId) => {
    const confirmed = window.confirm('Are you sure you want to delete this doctor?');
    if (!confirmed) return;

    setDeletingId(doctorId);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No auth token found. Please login.');

      await axios.delete(`${API_URL}/veterinarians/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh list after delete
      setRefreshToggle(prev => !prev);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete doctor.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-orange-700">Doctor Management</h2>
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Add Doctor
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {loading ? (
        <div>Loading doctors...</div>
      ) : doctors.length === 0 ? (
        <div className="text-gray-500">No doctors found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow border border-orange-200">
            <thead className="bg-orange-100 text-orange-700">
              <tr>
                <th className="py-2 px-4 text-left border-b border-orange-300">Name</th>
                <th className="py-2 px-4 text-left border-b border-orange-300">Email</th>
                <th className="py-2 px-4 text-left border-b border-orange-300">Specialization</th>
                <th className="py-2 px-4 text-left border-b border-orange-300">Experience (years)</th>
                <th className="py-2 px-4 text-left border-b border-orange-300">Clinic Name</th>
                <th className="py-2 px-4 text-left border-b border-orange-300">Availability</th>
                <th className="py-2 px-4 text-center border-b border-orange-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-orange-50">
                  <td className="py-2 px-4 border-b border-orange-200">{doctor.name}</td>
                  <td className="py-2 px-4 border-b border-orange-200">{doctor.email}</td>
                  <td className="py-2 px-4 border-b border-orange-200">{doctor.specialization}</td>
                  <td className="py-2 px-4 border-b border-orange-200">{doctor.experience}</td>
                  <td className="py-2 px-4 border-b border-orange-200">{doctor.clinicName}</td>
                  <td className="py-2 px-4 border-b border-orange-200">
                    {Array.isArray(doctor.availability)
                      ? doctor.availability.join(', ')
                      : doctor.availability}
                  </td>
                  <td className="py-2 px-4 border-b border-orange-200 text-center">
                    <button
                      disabled={deletingId === doctor._id}
                      onClick={() => handleDelete(doctor._id)}
                      className={`text-white px-3 py-1 rounded ${
                        deletingId === doctor._id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {deletingId === doctor._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Doctor Modal */}
      <AddDoctorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDoctorAdded={() => {
          setModalOpen(false);
          setRefreshToggle(prev => !prev);
        }}
      />
    </div>
  );
};

export default DoctorManagement;
