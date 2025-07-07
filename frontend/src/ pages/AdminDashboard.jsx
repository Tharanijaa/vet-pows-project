import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserManagement from "./UserManagement"; // Import your UserManagement component

const API_URL = import.meta.env.VITE_API_URL;

// Card Component for Dashboard Metrics
const Card = ({ title, value, change, color = "green" }) => (
  <div className="bg-white shadow rounded p-4">
    <h4 className="text-sm text-gray-500 font-medium mb-2">{title}</h4>
    <div className="text-xl font-bold">{value}</div>
    <div
      className={`text-xs mt-1 ${
        color === "yellow" ? "text-yellow-500" : "text-green-600"
      }`}
    >
      {change}
    </div>
  </div>
);

const AdminDashboard = () => {
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserCount();
  }, []);

  const fetchUserCount = async () => {
    setError(null);
    const token = localStorage.getItem('authToken');
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
      setUserCount(res.data.length); // response is array
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Please log in again.');
      } else {
        setError('Error fetching user count.');
      }
      setUserCount(0);
    }
  };

  const dogs = [
    {
      name: "Buddy",
      breed: "Golden Retriever",
      age: "2 years",
      owner: "John Doe",
      status: "Healthy",
      subscription: "Premium",
      nextVaccination: "2024-02-20",
    },
    {
      name: "Luna",
      breed: "Labrador",
      age: "1 year",
      owner: "Jane Smith",
      status: "Due Vaccination",
      subscription: "Free Trial",
      nextVaccination: "2024-01-25",
    },
    {
      name: "Max",
      breed: "German Shepherd",
      age: "3 years",
      owner: "Mike Johnson",
      status: "Treatment",
      subscription: "Premium",
      nextVaccination: "2024-03-15",
    },
  ];

  const appointments = [
    {
      time: "10:00 AM",
      dog: "Buddy",
      owner: "John Doe",
      doctor: "Dr. Sarah Wilson",
      type: "Checkup",
      status: "Confirmed",
    },
    {
      time: "2:30 PM",
      dog: "Luna",
      owner: "Jane Smith",
      doctor: "Dr. Michael Brown",
      type: "Vaccination",
      status: "Pending",
    },
  ];

  const handleNavigation = (item) => {
    if (item === "User Management") {
      setShowUserManagement(true);
    } else {
      setShowUserManagement(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 text-sm border-r">
        <h2 className="font-semibold text-gray-700 mb-6">Main Menu</h2>
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
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-200 font-medium text-gray-700 transition"
                onClick={() => handleNavigation(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-gray-500 text-xs flex items-center">
          <span className="mr-2">👤</span> Admin User
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        {showUserManagement ? (
          <UserManagement />
        ) : (
          <>
            {/* Metrics Cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Card title="Total Dogs" value="1,234" change="+12%" />
              <Card title="Active Users" value={userCount} change="+8%" />
              <Card title="Premium Users" value="342" change="+23%" />
              <Card
                title="Today's Appointments"
                value="24"
                change="6 pending confirmations"
                color="yellow"
              />
            </div>

            {/* Dog Table & Recent Activity */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Registered Dogs */}
              <div className="bg-gray-50 rounded p-4 shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Registered Dogs</h3>
                  <button className="bg-black text-white text-sm px-3 py-1 rounded">
                    + Add Dog
                  </button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th>Dog Name</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>Subscription</th>
                      <th>Next Vaccination</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dogs.map((dog, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2">
                          <div className="font-medium">{dog.name}</div>
                          <div className="text-xs text-gray-500">
                            {dog.breed} - {dog.age}
                          </div>
                        </td>
                        <td>{dog.owner}</td>
                        <td>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              dog.status === "Healthy"
                                ? "bg-black text-white"
                                : dog.status === "Due Vaccination"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-200 text-red-800"
                            }`}
                          >
                            {dog.status}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              dog.subscription === "Premium"
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {dog.subscription}
                          </span>
                        </td>
                        <td>{dog.nextVaccination}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-50 rounded p-4 shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <ul className="space-y-3 text-sm">
                  <li className="text-blue-600 font-medium">
                    New dog registered {" "}
                    <span className="text-gray-600 font-normal">
                      - Buddy by John Doe
                    </span>{" "}
                    <span className="text-xs text-gray-400 ml-2">2m ago</span>
                  </li>
                  <li className="text-green-600 font-medium">
                    Appointment confirmed {" "}
                    <span className="text-gray-600 font-normal">
                      - Luna's vaccination
                    </span>{" "}
                    <span className="text-xs text-gray-400 ml-2">5m ago</span>
                  </li>
                  <li className="text-yellow-600 font-medium">
                    Premium upgrade {" "}
                    <span className="text-gray-600 font-normal">
                      - Jane Smith
                    </span>{" "}
                    <span className="text-xs text-gray-400 ml-2">10m ago</span>
                  </li>
                  <li className="text-red-600 font-medium">
                    Vaccination reminder {" "}
                    <span className="text-gray-600 font-normal">
                      - Max in 3 days
                    </span>{" "}
                    <span className="text-xs text-gray-400 ml-2">1h ago</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-gray-50 rounded p-4 shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Today's Appointments</h3>
                <button className="bg-black text-white text-sm px-3 py-1 rounded">
                  + Schedule Appointment
                </button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th>Time</th>
                    <th>Dog & Owner</th>
                    <th>Doctor</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appt, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="py-2 font-medium">{appt.time}</td>
                      <td>
                        {appt.dog}
                        <div className="text-xs text-gray-500">{appt.owner}</div>
                      </td>
                      <td>{appt.doctor}</td>
                      <td>{appt.type}</td>
                      <td>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            appt.status === "Confirmed"
                              ? "bg-black text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td>⚙️</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
