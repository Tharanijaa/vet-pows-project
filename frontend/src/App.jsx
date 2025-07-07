import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './ pages/Home.jsx';
import Login from './ pages/Login.jsx';
import Signup from './ pages/Signup.jsx';

import AdminDashboard from './ pages/AdminDashboard.jsx';
import DoctorDashboard from './ pages/DoctorDashboard.jsx';
import DogDashboard from './ pages/DogDashboard.jsx'; // ✅ Correct import name


import ProtectedRoute from './hooks/ProtectedRoute.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dog-dashboard"
          element={
            <ProtectedRoute allowedRole="user">
              <DogDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
