
// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import UserManagement from "./UserManagement";
import DogManagement from "./DogManagement";
import DoctorManagement from './DoctorManagement'; // ✅ Doctor management import

const API_URL = import.meta.env.VITE_API_URL;

const Card = ({ title, value, change, color = "green" }) => (
  <div className="bg-white shadow rounded p-4 border-l-4" style={{ borderColor: color === 'yellow' ? '#facc15' : '#92400e' }}>
    <h4 className="text-sm text-brown-500 font-medium mb-2">{title}</h4>
    <div className="text-xl font-bold text-brown-700">{value}</div>
    <div className={`text-xs mt-1 ${color === "yellow" ? "text-yellow-500" : "text-brown-600"}`}>{change}</div>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [userCount, setUserCount] = useState(0);
  const [dogCount, setDogCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserCount();
    fetchDogCount();
  }, []);

  const fetchUserCount = async () => {
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      setUserCount(0);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserCount(res.data.length);
    } catch (error) {
      setError('Error fetching user count.');
      setUserCount(0);
    }
  };

  const fetchDogCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/animals/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDogCount(res.data.length);
    } catch (err) {
      console.error("Failed to fetch dog count", err);
      setDogCount(0);
    }
  };

  return (
    <div className="flex min-h-screen bg-orange-50">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-100 p-6 text-sm border-r border-orange-300">
        <h2 className="font-semibold text-orange-800 mb-6">Admin Panel</h2>
        <ul className="space-y-2">
          {[
            "Dashboard",
            "Dog Management",
            "User Management",
            "Doctor Management",
            "Appointments",
            "Food & Nutrition",
            "Settings",
          ].map((item, idx) => (
            <li key={idx}>
              <button
                className={`w-full text-left px-4 py-2 rounded-md font-medium text-orange-800 hover:bg-orange-200 transition ${activeTab === item ? "bg-orange-300" : ""}`}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-orange-700 text-xs flex items-center">
          <span className="mr-2">👤</span> Admin User
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-orange-50">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        {activeTab === "Dashboard" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card title="Total Dogs" value={dogCount} change="+12%" color="brown" />
              <Card title="Active Users" value={userCount} change="+8%" color="brown" />
              <Card title="Premium Users" value="342" change="+23%" color="brown" />
              <Card title="Today's Appointments" value="24" change="6 pending confirmations" color="yellow" />
            </div>
            <div className="text-center text-orange-400 mt-12 text-sm">
              📊 Coming soon: Recent Activity, Appointments Overview
            </div>
          </>
        )}

        {activeTab === "User Management" && <UserManagement />}
        {activeTab === "Dog Management" && <DogManagement />}
        {activeTab === "Doctor Management" && <DoctorManagement />} {/* ✅ This renders the doctor tab */}
      </main>
    </div>
  );
};

export default AdminDashboard;
