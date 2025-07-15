import React, { useState, useEffect } from 'react';
import AddDogModal from '../components/AddDogModal.jsx';
import DogCard from '../components/DogCard.jsx'; // Make sure this component adapts to the new card style or update it.
import VaccinationCard from '../components/ VaccinationCard.jsx'; // This component will be used for displaying vaccinations.
import DogSuggestionModal from '../components/DogSuggestionModal.jsx';

// Assuming you have your API URL set in a .env file
const API_URL = import.meta.env.VITE_API_URL;

const DogDashboard = () => {
  // State variables for managing data and UI
  const [dogs, setDogs] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [showModal, setShowModal] = useState(false); // Controls the "Add Dog" modal
  const [error, setError] = useState(null); // For displaying API errors
  const [activeTab, setActiveTab] = useState('overview'); // Controls which main content tab is visible
const [showSuggestionModal, setShowSuggestionModal] = useState(false);
const [selectedDog, setSelectedDog] = useState(null);
const [suggestions, setSuggestions] = useState({});
const [suggestionType, setSuggestionType] = useState('food');

  // --- Data Fetching Functions ---
const fetchSuggestions = async (dog, type) => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${API_URL}/animals/suggestions/${dog._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setSelectedDog(dog);
    setSuggestions(data);
    setSuggestionType(type);  // 👈 Add this line
    setShowSuggestionModal(true);
  } catch (err) {
    console.error('Failed to fetch suggestions:', err);
    setError('Unable to load food/vaccination suggestions.');
  }
};


  // Fetches dog data from the API
  const fetchDogs = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
      const res = await fetch(`${API_URL}/animals`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include authorization token
        },
      });
      // Check if the response is OK before parsing JSON
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setDogs(data);
    } catch (err) {
      console.error('Failed to load dogs:', err);
      setError('Failed to load dog data. Please try again.'); // User-friendly error message
    }
  };

  // Fetches vaccination data from the API
  const fetchVaccinations = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await fetch(`${API_URL}/vaccinations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setVaccinations(data);
    } catch (err) {
      console.error('Failed to load vaccinations:', err);
      setError('Failed to load vaccination data.');
    }
  };

  // Effect hook to fetch data when the component mounts
  useEffect(() => {
    fetchDogs();
    fetchVaccinations();
  }, []); // Empty dependency array ensures this runs once on mount

  // --- Helper Functions ---

  // Filters vaccinations relevant to a specific dog ID
  const getDogVaccinations = (dogId) => {
    return vaccinations.filter(vaccine => vaccine.animalId === dogId);
  };

  // Handles clicks on sidebar navigation and top CTA cards (except "Add New Pet")
  const handleFeatureClick = (featureName, targetTab) => {
    // In a real application, you'd use a router like React Router (e.g., `Maps('/food-shop')`)
    // For this example, we'll switch tabs or show an alert for unimplemented features.
    if (targetTab) {
      setActiveTab(targetTab); // Switch to the specified tab
    } else {
      // Placeholder for features not yet linked to a specific tab
      alert(`"${featureName}" feature coming soon!`);
    }
  };

  return (
    // Main container for the dashboard layout
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 text-gray-800 font-sans flex flex-col lg:flex-row">
      {/*
        NOTE: For Material Icons to work, you need to include their CDN link in your public/index.html
        For example, inside your <head> tag:
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
      */}

      {/* --- Sidebar / Navigation --- */}
      <aside className="w-full lg:w-64 bg-white shadow-xl p-6 lg:p-8 flex flex-col justify-between rounded-none lg:rounded-r-3xl sticky top-0 h-auto lg:h-screen z-10">
        <div>
          {/* Logo/Title in Sidebar */}
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-8 flex items-center">
            <span className="material-icons-outlined mr-3 text-4xl">pets</span> PetCare
          </h2>
          {/* Navigation Links */}
          <nav>
            <ul>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="material-icons-outlined mr-3 text-xl">dashboard</span> Dashboard
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab('my-dogs')}
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'my-dogs' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="material-icons-outlined mr-3 text-xl">pets</span> My Dogs
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'appointments' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="material-icons-outlined mr-3 text-xl">event</span> Appointments
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveTab('health-records')}
                  className={`flex items-center w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                    activeTab === 'health-records' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="material-icons-outlined mr-3 text-xl">medical_information</span> Health Records
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => handleFeatureClick('Food Shop')} // This doesn't switch tab, just shows alert
                  className="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <span className="material-icons-outlined mr-3 text-xl">storefront</span> Food Shop
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* "Add New Pet" Button in Sidebar */}
        <div className="mt-8">
          <button
            onClick={() => setShowModal(true)} // Opens the AddDogModal
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center text-lg"
          >
            <span className="material-icons-outlined mr-2">add</span> Add New Pet
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-grow p-6 lg:p-10">

        {/* --- Content for the 'Overview' Tab --- */}
        {activeTab === 'overview' && (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

            {/* --- Top Dashboard Widgets / Info Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {/* Total Pets Widget */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
                <div className="flex items-center mb-2">
                  <span className="material-icons-outlined text-4xl mr-3">pets</span>
                  <p className="text-sm font-semibold opacity-80">Total Pets</p>
                </div>
                <p className="text-5xl font-bold">{dogs.length}</p>
                <p className="text-sm opacity-90 mt-2">Manage your furry friends.</p>
              </div>

              {/* Upcoming Appointments Widget */}
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
                <div className="flex items-center mb-2">
                  <span className="material-icons-outlined text-4xl mr-3">event</span>
                  <p className="text-sm font-semibold opacity-80">Upcoming Appointments</p>
                </div>
                {/* Placeholder for actual appointment count */}
                <p className="text-5xl font-bold">0</p>
                <p className="text-sm opacity-90 mt-2">No visits scheduled soon.</p>
              </div>

              {/* Vaccinations Due Widget */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
                <div className="flex items-center mb-2">
                  <span className="material-icons-outlined text-4xl mr-3">vaccines</span>
                  <p className="text-sm font-semibold opacity-80">Vaccinations Due</p>
                </div>
                {/* Simple logic: count vaccinations whose due date has passed */}
                <p className="text-5xl font-bold">{vaccinations.filter(v => new Date(v.dueDate) < new Date()).length}</p>
                <p className="text-sm opacity-90 mt-2">Don't miss a vital shot!</p>
              </div>

              {/* Health Records Due Widget */}
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition duration-300 hover:scale-105">
                <div className="flex items-center mb-2">
                  <span className="material-icons-outlined text-4xl mr-3">assignment</span>
                  <p className="text-sm font-semibold opacity-80">Records to Review</p>
                </div>
                {/* Placeholder for actual health records due */}
                <p className="text-5xl font-bold">3</p>
                <p className="text-sm opacity-90 mt-2">Important health updates.</p>
              </div>
            </div>

            {/* --- Your Dogs Section (Overview - shows limited dogs) --- */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
                <span className="material-icons-outlined mr-3 text-3xl">face_5</span> Your Beloved Pets
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dogs.length > 0 ? (
                  // Display only the first 3 dogs for a concise overview
                  dogs.slice(0, 3).map((dog) => (
                    // <DogCard key={dog._id} dog={dog} />
                    <DogCard key={dog._id} dog={dog} onFetchSuggestions={fetchSuggestions} />

                  ))
                ) : (
                  <p className="text-gray-500 italic col-span-full">No pets registered yet. Add your first furry friend!</p>
                )}
                {/* Button to view all dogs if more than 3 exist */}
                {dogs.length > 3 && (
                  <div className="col-span-full text-center mt-4">
                    <button
                      onClick={() => setActiveTab('my-dogs')} // Switches to the "My Dogs" tab
                      className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-300"
                    >
                      View All {dogs.length} Pets &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* --- Upcoming Vaccinations (Overview - shows limited vaccinations) --- */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
                <span className="material-icons-outlined mr-3 text-3xl">vaccines</span> Recent Vaccinations
              </h2>
              <div className="space-y-4">
                {vaccinations.length > 0 ? (
                  // Display only the first 3 vaccinations for a concise overview
                  vaccinations.slice(0, 3).map((vaccine) => (
                    <VaccinationCard key={vaccine._id} vaccine={vaccine} />
                  ))
                ) : (
                  <p className="text-gray-500 italic">No recent vaccinations to display.</p>
                )}
              </div>
              {/* Button to view all vaccinations if more than 3 exist */}
              {vaccinations.length > 3 && (
                <button
                  onClick={() => setActiveTab('health-records')} // Switches to the "Health Records" tab
                  className="mt-5 text-indigo-600 hover:text-indigo-800 font-medium text-base transition duration-300 ease-in-out"
                >
                  View All Vaccinations &rarr;
                </button>
              )}
            </div>
          </>
        )}

        {/* --- Content for the 'My Dogs' Tab --- */}
        {activeTab === 'my-dogs' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="material-icons-outlined mr-3 text-4xl">pets</span> All Your Registered Pets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dogs.length > 0 ? (
                        // Display all dogs in this tab
                        dogs.map((dog) => (
                    <DogCard key={dog._id} dog={dog} onFetchSuggestions={fetchSuggestions} />
                        ))
                    ) : (
                        <p className="text-gray-500 italic text-center text-lg col-span-full">
                            No dogs registered yet. Go to Dashboard and click "Add New Pet"!
                        </p>
                    )}
                </div>
            </div>
        )}

        {/* --- Content for the 'Appointments' Tab --- */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center">
              <span className="material-icons-outlined mr-3 text-4xl">event</span> Appointments Calendar
            </h2>
            <p className="text-lg text-gray-600 mb-4">Your detailed appointments schedule will appear here.</p>
            {/* You would integrate a calendar component or list of appointments here */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out">
              Schedule New Appointment
            </button>
          </div>
        )}

        {/* --- Content for the 'Health Records' Tab --- */}
        {activeTab === 'health-records' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="material-icons-outlined mr-3 text-4xl">medical_information</span> Comprehensive Health Records
            </h2>
            <p className="text-lg text-gray-600 mb-4">View and manage all your pets' health data and vaccinations.</p>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">All Vaccinations</h3>
            <div className="space-y-4">
              {vaccinations.length > 0 ? (
                // Display all vaccinations in this tab
                vaccinations.map((vaccine) => (
                  <VaccinationCard key={vaccine._id} vaccine={vaccine} />
                ))
              ) : (
                <p className="text-gray-500 italic">No vaccinations recorded yet.</p>
              )}
            </div>
            {/* You could add sections for other health records here */}
          </div>
        )}

        {/* --- Global Error Display --- */}
        {error && (
          <div className="fixed inset-0 bg-red-100 bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-md mx-auto text-center border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-red-700 mb-3">Error!</h3>
              <p className="text-gray-700 mb-4">{error}</p>
              <button
                onClick={() => setError(null)} // Allows user to dismiss the error message
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </main>

      {/* --- Add Dog Modal (positioned outside main layout for overlay) --- */}
      <AddDogModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onDogAdded={fetchDogs} // Refresh dog list after a new dog is added
      />
     <DogSuggestionModal
  isOpen={showSuggestionModal}
  onClose={() => setShowSuggestionModal(false)}
  dog={selectedDog}
  suggestions={suggestions}
  type={suggestionType}
/>


    </div>
  );
};

export default DogDashboard;
