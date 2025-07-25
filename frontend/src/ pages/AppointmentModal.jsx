// import React, { useState } from 'react';

// const AppointmentModal = ({ isOpen, onClose, onSubmit, pets, doctors }) => {
//   const [formData, setFormData] = useState({
//     pet: '',
//     doctor: '',
//     date: '',
//     reason: ''
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     onClose(); // close the modal after submit
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md relative">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-600"
//         >
//           &times;
//         </button>
//         <h2 className="text-xl font-semibold mb-4">Schedule Appointment</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1">Select Pet</label>
//             <select
//               name="pet"
//               value={formData.pet}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             >
//               <option value="">-- Select --</option>
//               {pets.map((pet) => (
//                 <option key={pet._id} value={pet._id}>{pet.name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1">Select Doctor</label>
//             <select
//               name="doctor"
//               value={formData.doctor}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             >
//               <option value="">-- Select --</option>
//               {doctors.map((doc) => (
//                 <option key={doc._id} value={doc._id}>
//                   {doc.name} ({doc.specialization})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1">Date</label>
//             <input
//               type="datetime-local"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Reason</label>
//             <textarea
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//               rows={3}
//               placeholder="Reason for appointment"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             Confirm Appointment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AppointmentModal;
