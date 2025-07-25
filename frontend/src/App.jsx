import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51RlQzvR4GmEosOzPm0tvNvNFONSDOW3QRCuGjVogzEDIb9PjW7h85KJNeCV51rxt2n6A4g4ENbPB8aVS4BbWYXUb00Tsyv677t');

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './ pages/Home.jsx';
import Login from './ pages/Login.jsx';
import Signup from './ pages/Signup.jsx';

import AdminDashboard from './ pages/AdminDashboard.jsx';
import DoctorDashboard from './ pages/DoctorDashboard.jsx';
import DogDashboard from './ pages/DogDashboard.jsx'; //  Correct import name

import DoctorService from './ pages/DoctorService.jsx'
import PaymentPage from './ pages/PaymentPage.jsx';
import DogList from './ pages/DogList.jsx';

import AppointmentModal from './components/AppointmentModal.jsx';


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
        
        <Route path="/doctor-service" element={<DoctorService />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/dogList" element={<DogList />} />
                
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
            <ProtectedRoute allowedRole="veterinarian">
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

        <Route path="/appointments" element={
    <ProtectedRoute allowedRole="user">
      <AppointmentModal />
    </ProtectedRoute>
  } />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
