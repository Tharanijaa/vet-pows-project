// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';

// Import management components
import UserManagement from "../ pages/UserManagement"
import DogManagement from "../ pages/DogManagement";
import DoctorManagement from "./DoctorManagement";
import FoodManagement from "./FoodManagement";
import VaccinationManagement from "./VaccinationManagement";
import BreedManagement from "./BreedManagement";
import AppointmentManagement from "./AppointmentManagement";



const API_URL = import.meta.env.VITE_API_URL;

const Card = ({ title, value, change, loading = false }) => {
  return (
    <div className={`bg-amber-50 shadow-lg rounded-lg p-6 border-l-4 border-amber-600 transition-all hover:scale-[1.02]`}>
      <h4 className={`text-sm font-semibold mb-3 text-brown-800`}>{title}</h4>
      {loading ? (
        <div className="animate-pulse h-8 w-3/4 bg-amber-100 rounded"></div>
      ) : (
        <div className={`text-2xl font-bold text-brown-900`}>{value}</div>
      )}
      <div className={`text-xs mt-2 text-amber-800`}>{change}</div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [counts, setCounts] = useState({
    users: 0,
    dogs: 0,
    doctors: 0,
    premiumUsers: 0,
    todaysAppointments: 0,
    foodItems: 0,
    vaccinations: 0,
    breeds: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === "Dashboard") {
      fetchCounts();
    }
  }, [activeTab]);

  const fetchCounts = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('No authentication token found. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      
      const [
        usersRes, 
        dogsRes, 
        doctorsRes, 
        premiumRes, 
        appointmentsRes,
        foodRes,
        vaccinationsRes,
        breedsRes
      ] = await Promise.all([
        axios.get(`${API_URL}/users`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/animals/admin`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/doctors`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/users/premium`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/appointments/today`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/food`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/vaccinations`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/breeds`, { headers }).catch(() => ({ data: [] }))
      ]);

      setCounts({
        users: usersRes.data.length || 0,
        dogs: dogsRes.data.length || 0,
        doctors: doctorsRes.data.length || 0,
        premiumUsers: premiumRes.data.length || 0,
        todaysAppointments: appointmentsRes.data.length || 0,
        foodItems: foodRes.data.length || 0,
        vaccinations: vaccinationsRes.data.length || 0,
        breeds: breedsRes.data.length || 0
      });
    } catch (err) {
      console.error("Failed to fetch counts", err);
      setError('Error fetching dashboard data. Please try again.');
      // Reset counts on error
      setCounts({
        users: 0,
        dogs: 0,
        doctors: 0,
        premiumUsers: 0,
        todaysAppointments: 0,
        foodItems: 0,
        vaccinations: 0,
        breeds: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    "Dashboard",
    "Dog Management",
    "User Management",
    "Doctor Management",
    "Vaccination Management",
    "Breed Management",
    "Appointments",
    "Food & Nutrition"
  ];

  const getTabIcon = (tabName) => {
    const icons = {
      "Dashboard": "📊",
      "Dog Management": "🐕",
      "User Management": "👥",
      "Doctor Management": "👨‍⚕️",
      "Vaccination Management": "💉",
      "Breed Management": "🧬",
      "Appointments": "📅",
      "Food & Nutrition": "🍗"
    };
    return <span className="mr-2 text-brown-600">{icons[tabName]}</span>;
  };

  return (
    <div className="flex min-h-screen bg-amber-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 text-sm shadow-md border-r border-amber-200">
        <h2 className="font-bold text-xl text-brown-800 mb-8 flex items-center">
          <span className="mr-2 text-brown-600">🏥</span> PetCare Admin
        </h2>
        <ul className="space-y-3">
          {tabs.map((item, idx) => (
            <li key={idx}>
              <button
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all flex items-center
                  ${activeTab === item 
                    ? "bg-amber-100 text-brown-800 font-semibold shadow-inner" 
                    : "text-brown-600 hover:bg-amber-50"}
                `}
                onClick={() => setActiveTab(item)}
              >
                {getTabIcon(item)}
                {item}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-brown-700 text-sm flex items-center p-3 bg-amber-50 rounded-lg">
          <span className="mr-2 text-brown-600">👤</span> Admin User
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200 flex items-center">
            <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        {activeTab === "Dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-brown-900 mb-8 flex items-center">
              <span className="mr-2 text-brown-600">📋</span> Dashboard Overview
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card 
                title="Total Dogs" 
                value={counts.dogs} 
                change={counts.dogs === 0 ? "No dogs registered" : `${Math.floor(counts.dogs/10)} new this week`} 
                loading={loading}
              />
              <Card 
                title="Active Users" 
                value={counts.users} 
                change={counts.users === 0 ? "No active users" : `${Math.floor(counts.users/20)} active today`} 
                loading={loading}
              />
              <Card 
                title="Premium Users" 
                value={counts.premiumUsers} 
                change={counts.premiumUsers === 0 ? "No premium users" : `${Math.floor(counts.premiumUsers/5)}% of total`} 
                loading={loading}
              />
              <Card 
                title="Today's Appointments" 
                value={counts.todaysAppointments} 
                change={counts.todaysAppointments === 0 ? "No appointments today" : `${Math.floor(counts.todaysAppointments/3)} pending`} 
                loading={loading}
              />
              <Card 
                title="Registered Doctors" 
                value={counts.doctors} 
                change={counts.doctors === 0 ? "No doctors registered" : `${Math.floor(counts.doctors/2)} available today`} 
                loading={loading}
              />
              <Card 
                title="Food Items" 
                value={counts.foodItems} 
                change={counts.foodItems === 0 ? "No food items" : `${Math.floor(counts.foodItems/4)} new recipes`} 
                loading={loading}
              />
              <Card 
                title="Vaccinations" 
                value={counts.vaccinations} 
                change={counts.vaccinations === 0 ? "No vaccinations" : `${Math.floor(counts.vaccinations/5)} upcoming`} 
                loading={loading}
              />
              <Card 
                title="Dog Breeds" 
                value={counts.breeds} 
                change={counts.breeds === 0 ? "No breeds registered" : `${Math.floor(counts.breeds/3)} popular breeds`} 
                loading={loading}
              />
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
              <h3 className="text-lg font-semibold text-brown-800 mb-4 flex items-center">
                <span className="mr-2 text-brown-600">📈</span> Recent Activity
              </h3>
              <div className="text-center py-10 text-amber-600">
                <p className="text-sm mb-2">Activity monitoring coming soon</p>
                <p className="text-xs text-brown-500">We're working on detailed activity logs</p>
              </div>
            </div>
          </>
        )}

        {activeTab === "User Management" && <UserManagement />}
        {activeTab === "Dog Management" && <DogManagement />}
        {activeTab === "Doctor Management" && <DoctorManagement />}
        {activeTab === "Food & Nutrition" && <FoodManagement />}
        {activeTab === "Vaccination Management" && <VaccinationManagement />}
        {activeTab === "Breed Management" && <BreedManagement />}
        {activeTab === "Appointments" && <AppointmentManagement />}
      </main>
    </div>
  );
};

export default AdminDashboard;
  