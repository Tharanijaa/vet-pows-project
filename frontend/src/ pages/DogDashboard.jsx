// import React, { useState, useEffect } from 'react';
// import AddDogModal from '../components/AddDogModal.jsx';
// import DogCard from '../components/DogCard.jsx'; // Make sure this component adapts to the new card style or update it.
// import VaccinationCard from '../components/ VaccinationCard.jsx'; // This component will be used for displaying vaccinations.
// import DogSuggestionModal from '../components/DogSuggestionModal.jsx';
// import { useNavigate } from 'react-router-dom';
// import AppointmentModal from '../components/AppointmentModal.jsx';

// // Assuming you have your API URL set in a .env file
// const API_URL = import.meta.env.VITE_API_URL;

// const DogDashboard = () => {
//   const navigate = useNavigate();
// const handleBookClick = (doctor) => {
//   setSelectedDoctor(doctor);
//   setShowAppointmentModal(true);
// };
//   // State variables for managing data and UI
//   const [dogs, setDogs] = useState([]);
//   const [vaccinations, setVaccinations] = useState([]);
//   const [showModal, setShowModal] = useState(false); // Controls the "Add Dog" modal
//   const [error, setError] = useState(null); // For displaying API errors
//   const [activeTab, setActiveTab] = useState('overview'); // Controls which main content tab is visible
//   const [showSuggestionModal, setShowSuggestionModal] = useState(false);
//   const [selectedDog, setSelectedDog] = useState(null);
//   const [suggestions, setSuggestions] = useState({});
//   const [suggestionType, setSuggestionType] = useState('food');
//   const [selectedDoctor, setSelectedDoctor] = useState(null); // <-- Added
//   const [showAppointmentModal, setShowAppointmentModal] = useState(false); // <-- Added
//   const [appointments, setAppointments] = useState([]);
//   const [appointmentsLoading, setAppointmentsLoading] = useState(false);
//   const [appointmentsError, setAppointmentsError] = useState(null);

//   // --- Data Fetching Functions ---
//   const fetchSuggestions = async (dog, type) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/animals/suggestions/${dog._id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const data = await res.json();
//       setSelectedDog(dog);
//       setSuggestions(data);
//       setSuggestionType(type);  // 👈 Add this line
//       setShowSuggestionModal(true);
//     } catch (err) {
//       console.error('Failed to fetch suggestions:', err);
//       setError('Unable to load food/vaccination suggestions.');
//     }
//   };



//   // Fetches dog data from the API
//   const fetchDogs = async () => {
//     try {
//       const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
//       const res = await fetch(`${API_URL}/animals`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include authorization token
//         },
//       });
//       // Check if the response is OK before parsing JSON
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       setDogs(data);
//     } catch (err) {
//       console.error('Failed to load dogs:', err);
//       setError('Failed to load dog data. Please try again.'); // User-friendly error message
//     }
//   };

//   // Fetches vaccination data from the API
//   const fetchVaccinations = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/vaccinations`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       setVaccinations(data);
//     } catch (err) {
//       console.error('Failed to load vaccinations:', err);
//       setError('Failed to load vaccination data.');
//     }
//   };

//   const fetchDoctors = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/veterinarians`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.status === 403) {
//         setError('You do not have permission to view the list of veterinarians.');
//         setVeterinarians([]);
//         return;
//       }
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const data = await res.json();
//       setVeterinarians(data); // ✅ real doctors with _id
//     } catch (err) {
//       console.error('Doctors fetch பண்ண முடியலை:', err);
//       setError('மருத்துவர்களை load பண்ண முடியவில்லை.');
//     }
//   };

//   // Fetches user appointments
//   const fetchAppointments = async () => {
//     try {
//       setAppointmentsLoading(true);
//       setAppointmentsError(null);

//       const token = localStorage.getItem('token');
//       if (!token) {
//         setAppointmentsError('You must be logged in to view appointments.');
//         setAppointmentsLoading(false);
//         return;
//       }

//       const res = await fetch(`${API_URL}/doctor/appointments`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//       const data = await res.json();
//       setAppointments(data);
//     } catch (err) {
//       console.error('Failed to load appointments:', err);
//       setAppointmentsError('Failed to load appointments. Please try again.');
//     } finally {
//       setAppointmentsLoading(false);
//     }
//   };

//   // Effect hook to fetch data when the component mounts
//   useEffect(() => {
//     fetchDogs();
//     fetchVaccinations();
//     fetchDoctors(); // ✅ இங்க தான் main
//     // useEffect(() => {
// //   fetchDoctorAppointments();
// // }, []); // ✅ only once




//   }, []); // Empty dependency array ensures this runs once on mount

//   // --- Helper Functions ---

//   // Filters vaccinations relevant to a specific dog ID
//   const getDogVaccinations = (dogId) => {
//     return vaccinations.filter(vaccine => vaccine.animalId === dogId);
//   };

//   // Handles clicks on sidebar navigation and top CTA cards (except "Add New Pet")
//   const handleFeatureClick = (featureName, targetTab) => {
//     // In a real application, you'd use a router like React Router (e.g., `Maps('/food-shop')`)
//     // For this example, we'll switch tabs or show an alert for unimplemented features.
//     if (targetTab) {
//       setActiveTab(targetTab); // Switch to the specified tab
//     } else {
//       // Placeholder for features not yet linked to a specific tab
//       alert(`"${featureName}" feature coming soon!`);
//     }
//   };




//   const [veterinarians, setVeterinarians] = useState([]);






//   return (
//     // Main container for the dashboard layout
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-800 font-sans flex flex-col lg:flex-row">
//       {/*
//         NOTE: For Material Icons to work, you need to include their CDN link in your public/index.html
//         For example, inside your <head> tag:
//         <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
//       */}

//       {/* --- Sidebar / Navigation --- */}
//       <aside className="w-full lg:w-64 bg-white shadow-xl p-6 lg:p-8 flex flex-col justify-between rounded-none lg:rounded-r-3xl sticky top-0 h-auto lg:h-screen z-10">
//         <div>
//           {/* Logo/Title in Sidebar */}
//           <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 flex items-center">
//             <span className="material-icons-outlined mr-3 text-4xl">pets</span> PetCare
//           </h2>
//           {/* Navigation Links */}
//           <nav>
//             <ul>
//               <li className="mb-4">
//                 <button
//                   onClick={() => setActiveTab('overview')}
//                   className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                 >
//                   <span className="material-icons-outlined mr-3 text-xl">dashboard</span> Dashboard
//                 </button>
//               </li>
//               <li className="mb-4">
//                 <button
//                   onClick={() => setActiveTab('my-dogs')}
//                   className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${activeTab === 'my-dogs' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                 >
//                   <span className="material-icons-outlined mr-3 text-xl">pets</span> My Dogs
//                 </button>
//               </li>
//               <li className="mb-4">
//                 <button
//                   onClick={() => setActiveTab('appointments')}
//                   className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${activeTab === 'appointments' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                 >
//                   <span className="material-icons-outlined mr-3 text-xl">event</span> Appointments
//                 </button>
//               </li>
//               <li className="mb-4">
//                 <button
//                   onClick={() => setActiveTab('health-records')}
//                   className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${activeTab === 'health-records' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                 >
//                   <span className="material-icons-outlined mr-3 text-xl">medical_information</span> My Doctors
//                 </button>
//               </li>
//               <li className="mb-4">
//                 {/* <button
//                   onClick={() => handleFeatureClick('Food Shop')} // This doesn't switch tab, just shows alert
//                   className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
//                 >
//                   <span className="material-icons-outlined mr-3 text-xl">storefront</span> Food Shop
//                 </button> */}
//               </li>
//             </ul>
//           </nav>
//         </div>

//         {/* "Add New Pet" Button in Sidebar */}
//         <div className="mt-8">
//           <button
//             onClick={() => setShowModal(true)} // Opens the AddDogModal
//             className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center text-lg"
//           >
//             <span className="material-icons-outlined mr-2">add</span> Add New Pet
//           </button>
//         </div>
//       </aside>


//       {/* --- Main Content Area --- */}
//       <main className="flex-grow p-6 lg:p-10">

//         {/* --- Content for the 'Overview' Tab --- */}
//         {activeTab === 'overview' && (
//           <>
//             <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

//             {/* --- Top Dashboard Widgets / Info Cards --- */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
//               {/* Total Pets Widget */}
//               <div className="bg-gradient-to-r bg-[#A0522C] to-blue-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
//                 <div className="flex items-center mb-2">
//                   <span className="material-icons-outlined text-4xl mr-3">pets</span>
//                   <p className="text-sm font-semibold opacity-80">Total Pets</p>
//                 </div>
//                 <p className="text-5xl font-bold">{dogs.length}</p>
//                 <p className="text-sm opacity-90 mt-2">Manage your furry friends.</p>
//               </div>

//               {/* Upcoming Appointments Widget */}
//               <div className="bg-gradient-to-r  bg-[#A0522c] to-purple-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
//                 <div className="flex items-center mb-2">
//                   <span className="material-icons-outlined text-4xl mr-3">event</span>
//                   <p className="text-sm font-semibold opacity-80">Upcoming Appointments</p>
//                 </div>
//                 <p className="text-5xl font-bold">{appointments.filter(a => new Date(a.date) >= new Date()).length}</p>
//                 <p className="text-sm opacity-90 mt-2">
//                   {appointments.filter(a => new Date(a.date) >= new Date()).length > 0
//                     ? 'Visits scheduled soon.'
//                     : 'No visits scheduled soon.'}
//                 </p>
//               </div>

//               {/* Vaccinations Due Widget */}
//               <div className="bg-gradient-to-r bg-[#A0522c] to-teal-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
//                 <div className="flex items-center mb-2">
//                   <span className="material-icons-outlined text-4xl mr-3">vaccines</span>
//                   <p className="text-sm font-semibold opacity-80">Vaccinations Due</p>
//                 </div>
//                 {/* Simple logic: count vaccinations whose due date has passed */}
//                 <p className="text-5xl font-bold">{vaccinations.filter(v => new Date(v.dueDate) < new Date()).length}</p>
//                 <p className="text-sm opacity-90 mt-2">Don't miss a vital shot!</p>
//               </div>

//               {/* Health Records Due Widget */}
//               <div className="bg-gradient-to-r bg-[#A0522c] to-pink-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
//                 <div className="flex items-center mb-2">
//                   <span className="material-icons-outlined text-4xl mr-3">assignment</span>
//                   <p className="text-sm font-semibold opacity-80">Records to Review</p>
//                 </div>
//                 {/* Placeholder for actual health records due */}
//                 <p className="text-5xl font-bold">3</p>
//                 <p className="text-sm opacity-90 mt-2">Important health updates.</p>
//               </div>
//             </div>

//             {/* --- Your Dogs Section (Overview - shows limited dogs) --- */}
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="material-icons-outlined mr-3 text-3xl">pets</span> Your Beloved Pets
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {dogs.length > 0 ? (
//                   // Display only the first 3 dogs for a concise overview
//                   dogs.slice(0, 3).map((dog) => (
//                     // <DogCard key={dog._id} dog={dog} />
//                     <DogCard key={dog._id} dog={dog} onFetchSuggestions={fetchSuggestions} />

//                   ))
//                 ) : (
//                   <p className="text-gray-500 italic col-span-full">No pets registered yet. Add your first furry friend!</p>
//                 )}
//                 {/* Button to view all dogs if more than 3 exist */}
//                 {dogs.length > 3 && (
//                   <div className="col-span-full text-center mt-4">
//                     <button
//                       onClick={() => setActiveTab('my-dogs')} // Switches to the "My Dogs" tab
//                       className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-300"
//                     >
//                       View All {dogs.length} Pets &rarr;
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* --- Featured Veterinarians Section --- */}
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="material-icons-outlined mr-3 text-3xl">medical_services</span>
//                 Featured Veterinarians
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {veterinarians.map((vet) => (
//                   <div
//                     key={vet.id || vet._id || vet.name}
//                     className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 space-y-2"
//                   >
//                     <h3 className="text-lg font-bold text-gray-800">{vet.name}</h3>
//                     <p className="text-sm text-gray-600">Specialization: {vet.specialization}</p>
//                     <p className="text-sm text-gray-600">Experience: {vet.experience} years</p>
//                     <p className="text-sm">
//                       <span className="text-yellow-400 text-lg">★</span>{' '}
//                     </p>
//                     <p className="text-sm font-medium text-gray-800">Clinic: {vet.clinicName}</p>
//                     <p className="text-sm text-gray-600">Availability: {vet.availability}</p>

//                     <div className="flex gap-4 mt-4">
//                     <button
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition mt-3"
//                       onClick={() => handleBookClick(vet)}
//                     >
//                       Book
//                     </button>
//                       {/* <button className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
//                         Contact
//                       </button> */}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>



//             {/* --- Upcoming Vaccinations (Overview - shows limited vaccinations) --- */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="material-icons-outlined mr-3 text-3xl">vaccines</span> Recent Vaccinations
//               </h2>
//               <div className="space-y-4">
//                 {vaccinations.length > 0 ? (
//                   // Display only the first 3 vaccinations for a concise overview
//                   vaccinations.slice(0, 3).map((vaccine) => (
//                     <VaccinationCard key={vaccine._id} vaccine={vaccine} />
//                   ))
//                 ) : (
//                   <p className="text-gray-500 italic">No recent vaccinations to display.</p>
//                 )}
//               </div>
//               {/* Button to view all vaccinations if more than 3 exist */}
//               {vaccinations.length > 3 && (
//                 <button
//                   onClick={() => setActiveTab('health-records')} // Switches to the "Health Records" tab
//                   className="mt-5 text-indigo-600 hover:text-indigo-800 font-medium text-base transition duration-300 ease-in-out"
//                 >
//                   View All Vaccinations &rarr;
//                 </button>
//               )}
//             </div>
//           </>
//         )}

//         {/* --- Content for the 'My Dogs' Tab --- */}
//         {activeTab === 'my-dogs' && (
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//               <span className="material-icons-outlined mr-3 text-4xl">pets</span> All Your Registered Pets
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {dogs.length > 0 ? (
//                 // Display all dogs in this tab
//                 dogs.map((dog) => (
//                   <DogCard key={dog._id} dog={dog} onFetchSuggestions={fetchSuggestions} />
//                 ))
//               ) : (
//                 <p className="text-gray-500 italic text-center text-lg col-span-full">
//                   No dogs registered yet. Go to Dashboard and click "Add New Pet"!
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* --- Content for the 'Appointments' Tab --- */}
//         {activeTab === 'appointments' && (
//           <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
//               <span className="material-icons-outlined mr-3 text-4xl">event</span> Appointments Calendar
//             </h2>
//             <p className="text-lg text-gray-600 mb-4">Your detailed appointments schedule will appear here.</p>
//             {/* You would integrate a calendar component or list of appointments here */}
//             <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
//               Schedule New Appointment
//             </button>
//           </div>
//         )}

//         {/* --- Content for the 'Health Records' Tab --- */}
//         {activeTab === 'health-records' && (
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
//               <span className="material-icons-outlined mr-3 text-4xl">medical_information</span> Comprehensive Health Records
//             </h2>
//             <p className="text-lg text-gray-600 mb-4">View and manage all your pets' health data and vaccinations.</p>
//             <h3 className="text-xl font-semibold text-gray-700 mb-4">All Vaccinations</h3>
//             <div className="space-y-4">
//               {vaccinations.length > 0 ? (
//                 // Display all vaccinations in this tab
//                 vaccinations.map((vaccine) => (
//                   <VaccinationCard key={vaccine._id} vaccine={vaccine} />
//                 ))
//               ) : (
//                 <p className="text-gray-500 italic">No vaccinations recorded yet.</p>
//               )}
//             </div>
//             {/* You could add sections for other health records here */}
//           </div>
//         )}

//         {/* --- Global Error Display --- */}
//         {error && (
//           <div className="fixed inset-0 bg-red-100 bg-opacity-75 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg p-6 shadow-xl max-w-md mx-auto text-center border-l-4 border-red-500">
//               <h3 className="text-xl font-bold text-red-700 mb-3">Error!</h3>
//               <p className="text-gray-700 mb-4">{error}</p>
//               <button
//                 onClick={() => setError(null)} // Allows user to dismiss the error message
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
//               >
//                 Dismiss
//               </button>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* --- Add Dog Modal (positioned outside main layout for overlay) --- */}
//       <AddDogModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         onDogAdded={fetchDogs} // Refresh dog list after a new dog is added
//       />
//       <DogSuggestionModal
//         isOpen={showSuggestionModal}
//         onClose={() => setShowSuggestionModal(false)}
//         dog={selectedDog}
//         suggestions={suggestions}
//         type={suggestionType}
//       />

//       {/* AppointmentModal removed, now handled as a separate page */}

//       {showAppointmentModal && selectedDoctor && (
//   <AppointmentModal
//     isOpen={showAppointmentModal}
//     doctor={selectedDoctor}
//     onClose={() => setShowAppointmentModal(false)}
//     onAppointmentBooked={fetchAppointments}
//   />
// )}



//     </div>
//   );
// };

// export default DogDashboard;







// import React, { useState, useEffect } from 'react';
// import AddDogModal from '../components/AddDogModal.jsx';
// import DogCard from '../components/DogCard.jsx';
// import VaccinationCard from '../components/ VaccinationCard.jsx';
// import DogSuggestionModal from '../components/DogSuggestionModal.jsx';
// import { useNavigate } from 'react-router-dom';
// import AppointmentModal from '../components/AppointmentModal.jsx';

// const API_URL = import.meta.env.VITE_API_URL;

// const DogDashboard = () => {
//   const navigate = useNavigate();

//   // --- State Variables ---
//   const [dogs, setDogs] = useState([]);
//   const [vaccinations, setVaccinations] = useState([]);
//   const [showModal, setShowModal] = useState(false); // Add Dog Modal
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [showSuggestionModal, setShowSuggestionModal] = useState(false);
//   const [selectedDog, setSelectedDog] = useState(null);
//   const [suggestions, setSuggestions] = useState({});
//   const [suggestionType, setSuggestionType] = useState('food');
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [showAppointmentModal, setShowAppointmentModal] = useState(false);
//   const [veterinarians, setVeterinarians] = useState([]);

//   // --- New State for Appointments ---
//   const [appointments, setAppointments] = useState([]);
//   const [appointmentsLoading, setAppointmentsLoading] = useState(false);
//   const [appointmentsError, setAppointmentsError] = useState(null);

//   // --- Fetch Functions ---
//   const fetchDogs = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/animals`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const data = await res.json();
//       setDogs(data);
//     } catch (err) {
//       console.error('Failed to load dogs:', err);
//       setError('Failed to load dog data. Please try again.');
//     }
//   };

//   const fetchVaccinations = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/vaccinations`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const data = await res.json();
//       setVaccinations(data);
//     } catch (err) {
//       console.error('Failed to load vaccinations:', err);
//       setError('Failed to load vaccination data.');
//     }
//   };

//   const fetchDoctors = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/veterinarians`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const data = await res.json();
//       setVeterinarians(data);
//     } catch (err) {
//       console.error('Failed to load veterinarians:', err);
//       setError('Failed to load veterinarians.');
//     }
//   };

//   // --- NEW: Fetch user appointments ---
//   const fetchAppointments = async () => {
//     try {
//       setAppointmentsLoading(true);
//       setAppointmentsError(null);

//       const token = localStorage.getItem('token');
//       if (!token) {
//         setAppointmentsError('You must be logged in to view appointments.');
//         setAppointmentsLoading(false);
//         return;
//       }

//       const res = await fetch(`${API_URL}/appointments`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

//       const data = await res.json();
//       setAppointments(data);
//     } catch (err) {
//       console.error('Failed to load appointments:', err);
//       setAppointmentsError('Failed to load appointments. Please try again.');
//     } finally {
//       setAppointmentsLoading(false);
//     }
//   };

//   // --- Fetch data once on mount ---
//   useEffect(() => {
//     fetchDogs();
//     fetchVaccinations();
//     fetchDoctors();
//   }, []);

//   // --- Fetch appointments when user visits appointments tab ---
//   useEffect(() => {
//     if (activeTab === 'appointments') {
//       fetchAppointments();
//     }
//   }, [activeTab]);

//   // --- Fetch food/vaccination suggestions ---
//   const fetchSuggestions = async (dog, type) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/animals/suggestions/${dog._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setSelectedDog(dog);
//       setSuggestions(data);
//       setSuggestionType(type);
//       setShowSuggestionModal(true);
//     } catch (err) {
//       console.error('Failed to fetch suggestions:', err);
//       setError('Unable to load food/vaccination suggestions.');
//     }
//   };

//   // --- Handle veterinarian "Book" button ---
//   const handleBookClick = (doctor) => {
//     setSelectedDoctor(doctor);
//     setShowAppointmentModal(true);
//   };

//   // --- Helper to get vaccinations for a dog ---
//   const getDogVaccinations = (dogId) => {
//     return vaccinations.filter((v) => v.animalId === dogId);
//   };

//   // --- Sidebar feature click handler ---
//   const handleFeatureClick = (featureName, targetTab) => {
//     if (targetTab) {
//       setActiveTab(targetTab);
//     } else {
//       alert(`"${featureName}" feature coming soon!`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-800 font-sans flex flex-col lg:flex-row">
//       {/* Sidebar */}
//       <aside className="w-full lg:w-64 bg-white shadow-xl p-6 lg:p-8 flex flex-col justify-between rounded-none lg:rounded-r-3xl sticky top-0 h-auto lg:h-screen z-10">
//         <div>
//           <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 flex items-center">
//             <span className="material-icons-outlined mr-3 text-4xl">pets</span> PetCare
//           </h2>
//           <nav>
//             <ul>
//               <li className="mb-4">
//                 <button
//                   onClick={() => setActiveTab('overview')}
//                   className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${
//                     activeTab === 'overview'
//                       ? 'bg-indigo-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <span className="material-icons-outlined mr-3 text-xl">dashboard</span> Dashboard
//                 </button>
//               </li>
//               <li className="mb-4">
//                 <button
//                   onClick={() => setActiveTab('my-dogs')}
//                   className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${
//                     activeTab === 'my-dogs'
//                       ? 'bg-indigo-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <span className="material-icons-outlined mr-3 text-xl">pets</span> My Dogs
//                 </button>
//               </li>
//               <li className="mb-4">
//                 <button
//                   onClick={() => setActiveTab('appointments')}
//                   className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${
//                     activeTab === 'appointments'
//                       ? 'bg-indigo-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <span className="material-icons-outlined mr-3 text-xl">event</span> Appointments
//                 </button>
//               </li>
//               <li className="mb-4">
//                 <button
//                   onClick={() => setActiveTab('health-records')}
//                   className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${
//                     activeTab === 'health-records'
//                       ? 'bg-indigo-600 text-white shadow-md'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   }`}
//                 >
//                   <span className="material-icons-outlined mr-3 text-xl">medical_information</span> Health Records
//                 </button>
//               </li>
//               <li className="mb-4">
//                 <button
//                   onClick={() => handleFeatureClick('Food Shop')}
//                   className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
//                 >
//                   <span className="material-icons-outlined mr-3 text-xl">storefront</span> Food Shop
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>

//         <div className="mt-8">
//           <button
//             onClick={() => setShowModal(true)}
//             className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center text-lg"
//           >
//             <span className="material-icons-outlined mr-2">add</span> Add New Pet
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-grow p-6 lg:p-10">
//         {/* Overview tab */}
//         {activeTab === 'overview' && (
//           <>
//             <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
//             {/* Widgets */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
//               {/* Total Pets */}
//               <div className="bg-gradient-to-r bg-[#A0522C] to-blue-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
//                 <div className="flex items-center mb-2">
//                   <span className="material-icons-outlined text-4xl mr-3">pets</span>
//                   <p className="text-sm font-semibold opacity-80">Total Pets</p>
//                 </div>
//                 <p className="text-5xl font-bold">{dogs.length}</p>
//                 <p className="text-sm opacity-90 mt-2">Manage your furry friends.</p>
//               </div>

//               {/* Upcoming Appointments */}
//               <div className="bg-gradient-to-r bg-[#A0522c] to-purple-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
//                 <div className="flex items-center mb-2">
//                   <span className="material-icons-outlined text-4xl mr-3">event</span>
//                   <p className="text-sm font-semibold opacity-80">Upcoming Appointments</p>
//                 </div>
//                 <p className="text-5xl font-bold">
//                   {
//                     appointments.filter((a) => new Date(a.date) >= new Date()).length
//                   }
//                 </p>
//                 <p className="text-sm opacity-90 mt-2">Visits scheduled soon.</p>
//               </div>

//               {/* Vaccinations Due */}
//               <div className="bg-gradient-to-r bg-[#A0522c] to-teal-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
//                 <div className="flex items-center mb-2">
//                   <span className="material-icons-outlined text-4xl mr-3">vaccines</span>
//                   <p className="text-sm font-semibold opacity-80">Vaccinations Due</p>
//                 </div>
//                 <p className="text-5xl font-bold">
//                   {vaccinations.filter((v) => new Date(v.dueDate) < new Date()).length}
//                 </p>
//                 <p className="text-sm opacity-90 mt-2">Don't miss a vital shot!</p>
//               </div>

//               {/* Health Records Due */}
//               <div className="bg-gradient-to-r bg-[#A0522c] to-pink-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
//                 <div className="flex items-center mb-2">
//                   <span className="material-icons-outlined text-4xl mr-3">assignment</span>
//                   <p className="text-sm font-semibold opacity-80">Records to Review</p>
//                 </div>
//                 <p className="text-5xl font-bold">3</p>
//                 <p className="text-sm opacity-90 mt-2">Important health updates.</p>
//               </div>
//             </div>

//             {/* Your Dogs (Overview) */}
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="material-icons-outlined mr-3 text-3xl">pets</span> Your Beloved Pets
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {dogs.length > 0 ? (
//                   dogs.slice(0, 3).map((dog) => (
//                     <DogCard key={dog._id} dog={dog} onFetchSuggestions={fetchSuggestions} />
//                   ))
//                 : (
//                   <p className="text-gray-500 italic col-span-full">No pets registered yet. Add your first furry friend!</p>
//                 )}
//                 {dogs.length > 3 && (
//                   <div className="col-span-full text-center mt-4">
//                     <button
//                       onClick={() => setActiveTab('my-dogs')}
//                       className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-300"
//                     >
//                       View All {dogs.length} Pets &rarr;
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Featured Veterinarians */}
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="material-icons-outlined mr-3 text-3xl">medical_services</span> Featured Veterinarians
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {veterinarians.map((vet) => (
//                   <div
//                     key={vet.id || vet._id || vet.name}
//                     className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 space-y-2"
//                   >
//                     <h3 className="text-lg font-bold text-gray-800">{vet.name}</h3>
//                     <p className="text-sm text-gray-600">Specialization: {vet.specialization}</p>
//                     <p className="text-sm text-gray-600">Experience: {vet.experience} years</p>
//                     <p className="text-sm font-medium text-gray-800">Clinic: {vet.clinicName}</p>
//                     <p className="text-sm text-gray-600">Availability: {vet.availability}</p>
//                     <div className="flex gap-4 mt-4">
//                       <button
//                         className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm transition mt-3"
//                         onClick={() => handleBookClick(vet)}
//                       >
//                         Book
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Recent Vaccinations */}
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
//                 <span className="material-icons-outlined mr-3 text-3xl">vaccines</span> Recent Vaccinations
//               </h2>
//               <div className="space-y-4">
//                 {vaccinations.length > 0 ? (
//                   vaccinations.slice(0, 3).map((vaccine) => (
//                     <VaccinationCard key={vaccine._id} vaccine={vaccine} />
//                   ))
//                 : (
//                   <p className="text-gray-500 italic">No recent vaccinations available.</p>
//                 )}
//               </div>
//             </div>
//           </>
//         )}

//         {/* My Dogs tab */}
//         {activeTab === 'my-dogs' && (
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
//               <span className="material-icons-outlined mr-3 text-4xl">pets</span> Your Pets
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {dogs.length > 0 ? (
//                 dogs.map((dog) => (
//                   <DogCard key={dog._id} dog={dog} onFetchSuggestions={fetchSuggestions} />
//                 ))
//               ) : (
//                 <p className="text-gray-500 italic col-span-full">No pets registered yet.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Vaccinations tab */}
//         {activeTab === 'vaccinations' && (
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
//               <span className="material-icons-outlined mr-3 text-4xl">vaccines</span> Vaccinations
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {vaccinations.length > 0 ? (
//                 vaccinations.map((vaccine) => (
//                   <VaccinationCard key={vaccine._id} vaccine={vaccine} />
//                 ))
//               ) : (
//                 <p className="text-gray-500 italic col-span-full">No vaccination data available.</p>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Appointments tab */}
//         {activeTab === 'appointments' && (
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
//               <span className="material-icons-outlined mr-3 text-4xl">event</span> Your Appointments
//             </h2>

//             {appointmentsLoading ? (
//               <p>Loading appointments...</p>
//             ) : appointmentsError ? (
//               <p className="text-red-600">{appointmentsError}</p>
//             ) : appointments.length === 0 ? (
//               <p>No appointments booked yet.</p>
//             ) : (
//               <div className="space-y-4">
//                 {appointments.map((appt) => (
//                   <div
//                     key={appt._id}
//                     className="border p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
//                   >
//                     <div>
//                       <p>
//                         <strong>Pet:</strong> {appt.pet?.name || 'Unknown'}
//                       </p>
//                       <p>
//                         <strong>Veterinarian:</strong> {appt.veterinarian?.name || 'Unknown'}
//                       </p>
//                       <p>
//                         <strong>Date:</strong>{' '}
//                         {new Date(appt.date).toLocaleDateString()}
//                       </p>
//                       <p>
//                         <strong>Time:</strong> {appt.time}
//                       </p>
//                       <p>
//                         <strong>Reason:</strong> {appt.reason}
//                       </p>
//                     </div>
//                     <div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-white font-semibold ${
//                           appt.status === 'pending'
//                             ? 'bg-yellow-500'
//                             : appt.status === 'accepted'
//                             ? 'bg-green-600'
//                             : appt.status === 'rejected'
//                             ? 'bg-red-600'
//                             : 'bg-gray-500'
//                         }`}
//                       >
//                         {appt.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <button
//               onClick={() => setActiveTab('overview')} // or open modal to book new appointment
//               className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
//             >
//               Book New Appointment
//             </button>
//           </div>
//         )}

//         {/* Health Records tab (placeholder) */}
//         {activeTab === 'health-records' && (
//           <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
//               <span className="material-icons-outlined mr-3 text-4xl">medical_information</span>{' '}
//               Health Records
//             </h2>
//             <p className="text-lg text-gray-600 mb-4">Health records coming soon!</p>
//           </div>
//         )}

//         {/* Modals */}
//         {showModal && <AddDogModal onClose={() => setShowModal(false)} onDogAdded={fetchDogs} />}
//         {showSuggestionModal && (
//           <DogSuggestionModal
//             dog={selectedDog}
//             suggestions={suggestions}
//             type={suggestionType}
//             onClose={() => setShowSuggestionModal(false)}
//           />
//         )}
//         {showAppointmentModal && selectedDoctor && (
//           <AppointmentModal
//             isOpen={showAppointmentModal}
//             onClose={() => setShowAppointmentModal(false)}
//             doctor={selectedDoctor}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// export default DogDashboard;



// import React, { useState, useEffect } from 'react';
// import AddDogModal from '../pags/';
// import DogCard from '../components/DogCard.jsx';
// import VaccinationCard from '../components/VaccinationCard.jsx';
// import DogSuggestionModal from '../components/DogSuggestionModal.jsx';
// import AppointmentModal from '../components/AppointmentModal.jsx';
// import { useNavigate } from 'react-router-dom';


import React, { useState, useEffect } from 'react';
import AddDogModal from '../components/AddDogModal.jsx';
import DogCard from '../components/DogCard.jsx'; 
import VaccinationCard from '../components/ VaccinationCard.jsx'; // This component will be used for displaying vaccinations.
import DogSuggestionModal from '../components/DogSuggestionModal.jsx';
import { useNavigate } from 'react-router-dom';
import AppointmentModal from '../components/AppointmentModal.jsx';




const API_URL = import.meta.env.VITE_API_URL;

const DogDashboard = () => {
  const navigate = useNavigate();

  const [dogs, setDogs] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);
  const [selectedDog, setSelectedDog] = useState(null);
  const [suggestions, setSuggestions] = useState({});
  const [suggestionType, setSuggestionType] = useState('food');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const handleBookClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowAppointmentModal(true);
  };

  const fetchDogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/animals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setDogs(data);
    } catch (err) {
      console.error('Failed to load dogs:', err);
      setError('Failed to load dog data. Please try again.');
    }
  };

  const fetchVaccinations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/vaccinations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setVaccinations(data);
    } catch (err) {
      console.error('Failed to load vaccinations:', err);
      setError('Failed to load vaccination data.');
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/veterinarians`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setVeterinarians(data);
    } catch (err) {
      console.error('Failed to load doctors:', err);
      setError('Unable to load veterinarians.');
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/doctor/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error('Failed to load appointments:', err);
    }
  };

  const fetchSuggestions = async (dog, type) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/animals/suggestions/${dog._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSelectedDog(dog);
      setSuggestions(data);
      setSuggestionType(type);
      setShowSuggestionModal(true);
    } catch (err) {
      console.error('Failed to fetch suggestions:', err);
      setError('Unable to load suggestions.');
    }
  };

  useEffect(() => {
    fetchDogs();
    fetchVaccinations();
    fetchDoctors();
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-amber-700">PetCare</h1>
        <nav className="space-y-4">
          <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'overview' ? 'bg-amber-600 text-white' : 'hover:bg-gray-100'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('my-dogs')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'my-dogs' ? 'bg-amber-600 text-white' : 'hover:bg-gray-100'}`}>My Dogs</button>
          <button onClick={() => setActiveTab('appointments')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'appointments' ? 'bg-amber-600 text-white' : 'hover:bg-gray-100'}`}>Appointments</button>
          <button onClick={() => setActiveTab('doctors')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'doctors' ? 'bg-amber-600 text-white' : 'hover:bg-gray-100'}`}>My Doctors</button>
        </nav>
        <button onClick={() => setShowModal(true)} className="mt-10 w-full bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600">+ Add New Pet</button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'overview' && (
          <>
            <h2 className="text-3xl font-bold mb-4">Dashboard Overview</h2>
            {/* Pets Widget */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-sm text-gray-500">Total Pets</p>
                <p className="text-4xl font-bold">{dogs.length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-sm text-gray-500">Upcoming Appointments</p>
                <p className="text-4xl font-bold">{appointments.filter(a => new Date(a.date) >= new Date()).length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-sm text-gray-500">Vaccinations Due</p>
                <p className="text-4xl font-bold">{vaccinations.filter(v => new Date(v.dueDate) < new Date()).length}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow text-center">
                <p className="text-sm text-gray-500">Doctors</p>
                <p className="text-4xl font-bold">{veterinarians.length}</p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'my-dogs' && (
          <>
            <h2 className="text-3xl font-bold mb-6">My Dogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dogs.map((dog) => (
                <DogCard key={dog._id} dog={dog} onFetchSuggestions={fetchSuggestions} />
              ))}
            </div>
          </>
        )}

        {activeTab === 'appointments' && (
          <>
            <h2 className="text-3xl font-bold mb-6">Appointments</h2>
            <ul className="space-y-4">
              {appointments.map((a) => (
                <li key={a._id} className="bg-white p-4 shadow rounded-lg">
                  <p><strong>Doctor:</strong> {a.doctorName}</p>
                  <p><strong>Date:</strong> {new Date(a.date).toLocaleString()}</p>
                  <p><strong>Status:</strong> {a.status}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === 'doctors' && (
          <>
            <h2 className="text-3xl font-bold mb-6">My Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {veterinarians.map((vet) => (
                <div key={vet._id} className="bg-white p-4 shadow rounded-lg">
                  <h3 className="text-xl font-semibold">{vet.name}</h3>
                  <p className="text-gray-600 text-sm">Specialization: {vet.specialization}</p>
                  <p className="text-gray-600 text-sm">Experience: {vet.experience} years</p>
                  <p className="text-gray-600 text-sm">Clinic: {vet.clinicName}</p>
                  <p className="text-gray-600 text-sm">Availability: {vet.availability}</p>
                  <button
                    onClick={() => handleBookClick(vet)}
                    className="mt-3 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {error && (
          <div className="mt-6 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
            {error}
            <button onClick={() => setError(null)} className="ml-4 text-sm underline">Dismiss</button>
          </div>
        )}
      </main>

      {/* Modals */}
      <AddDogModal isOpen={showModal} onClose={() => setShowModal(false)} onDogAdded={fetchDogs} />
      <DogSuggestionModal
        isOpen={showSuggestionModal}
        onClose={() => setShowSuggestionModal(false)}
        dog={selectedDog}
        suggestions={suggestions}
        type={suggestionType}
      />
      {showAppointmentModal && selectedDoctor && (
        <AppointmentModal
          isOpen={showAppointmentModal}
          doctor={selectedDoctor}
          onClose={() => setShowAppointmentModal(false)}
          onAppointmentBooked={fetchAppointments}
        />
      )}
    </div>
  );
};

export default DogDashboard;
