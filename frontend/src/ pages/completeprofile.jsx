// // CompleteProfile.jsx
// import React, { useState, useEffect } from 'react';

// const CompleteProfile = () => {
//   const [dogProfileData, setDogProfileData] = useState(null);
//   const [userId, setUserId] = useState("mock-user-12345");

//   useEffect(() => {
//     const defaultDogProfile = {
//       owner: userId,
//       name: "Max",
//       species: "Dog",
//       breed: "Golden Retriever",
//       age: 3,
//       gender: "Male",
//       weight: "28 kg",
//       healthIssues: ["None"],
//       profilePic: "https://placehold.co/150x150/FACC15/ffffff?text=Max",
//       consultationHistory: [
//         {
//           id: 1,
//           date: "2024-01-15",
//           doctor: "Dr. Sarah Johnson",
//           diagnosis: "Annual Checkup",
//           treatment: "Rabies vaccination administered",
//           notes: "Dog is in excellent health. Continue current diet and exercise routine.",
//           nextVisit: "2025-01-15",
//         },
//         {
//           id: 2,
//           date: "2023-12-10",
//           doctor: "Dr. Sarah Johnson",
//           diagnosis: "Skin irritation",
//           treatment: "Antihistamine prescribed",
//           notes: "Skin cleared up after treatment. Avoid new foods for a few weeks.",
//         },
//       ],
//       vaccinationRecords: [
//         {
//           id: 1,
//           vaccine: "Rabies",
//           given: "2024-01-15",
//           due: "2025-01-15",
//           status: "Overdue",
//         },
//       ],
//     };

//     setDogProfileData(defaultDogProfile);
//   }, [userId]);

//   const handleBookAppointment = () => {
//     alert("Navigating to appointment booking page for Max!");
//   };

//   if (!dogProfileData) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//         <div className="text-lg text-gray-700 dark:text-gray-300">Loading Max's profile...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
//       <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
//         <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
//           Owner User ID: <span className="font-mono break-all">{userId}</span>
//         </div>

//         <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
//           <img
//             src={dogProfileData.profilePic}
//             alt={`${dogProfileData.name}'s profile`}
//             className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-yellow-400 dark:border-yellow-600"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "https://placehold.co/150x150/FACC15/ffffff?text=Max";
//             }}
//           />
//           <div className="text-center sm:text-left flex-grow">
//             <h1 className="text-3xl sm:text-4xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">
//               {dogProfileData.name}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
//               {dogProfileData.species} - {dogProfileData.breed}
//             </p>
//             <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
//               <span className="flex items-center text-gray-700 dark:text-gray-200">🐶 Age: {dogProfileData.age} years</span>
//               <span className="flex items-center text-gray-700 dark:text-gray-200">♂ Gender: {dogProfileData.gender}</span>
//               <span className="flex items-center text-gray-700 dark:text-gray-200">⚖ Weight: {dogProfileData.weight}</span>
//             </div>
//             {dogProfileData.healthIssues?.length > 0 && (
//               <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
//                 Health Issues: {dogProfileData.healthIssues.join(', ')}
//               </p>
//             )}
//           </div>
//           <button
//             onClick={handleBookAppointment}
//             className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
//           >
//             Book Appointment
//           </button>
//         </div>

//         {/* Consultation History */}
//         {dogProfileData.consultationHistory?.length > 0 && (
//           <div className="py-6 border-b border-gray-200 dark:border-gray-700">
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Consultation History</h2>
//             <div className="space-y-4">
//               {dogProfileData.consultationHistory.map((consultation) => (
//                 <div key={consultation.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
//                   <p><strong>Date:</strong> {consultation.date}</p>
//                   <p><strong>Doctor:</strong> {consultation.doctor}</p>
//                   <p><strong>Diagnosis:</strong> {consultation.diagnosis}</p>
//                   <p><strong>Treatment:</strong> {consultation.treatment}</p>
//                   {consultation.notes && <p><strong>Notes:</strong> {consultation.notes}</p>}
//                   {consultation.nextVisit && <p><strong>Next Visit:</strong> {consultation.nextVisit}</p>}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Vaccination Records */}
//         {dogProfileData.vaccinationRecords?.length > 0 && (
//           <div className="py-6">
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Vaccination Records</h2>
//             <div className="space-y-4">
//               {dogProfileData.vaccinationRecords.map((vaccination) => (
//                 <div
//                   key={vaccination.id}
//                   className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-sm flex justify-between items-center"
//                 >
//                   <div>
//                     <p><strong>Vaccine:</strong> {vaccination.vaccine}</p>
//                     <p><strong>Given:</strong> {vaccination.given}</p>
//                     <p><strong>Due:</strong> {vaccination.due}</p>
//                   </div>
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                       vaccination.status === 'Overdue'
//                         ? 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200'
//                         : 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200'
//                     }`}
//                   >
//                     {vaccination.status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompleteProfile;


