import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-[#8B4513] text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            🐶 Dog Care
          </h2>
          <p className="text-gray-200 mt-2">Your dog's health is our priority</p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Services</h2>
          <ul className="text-gray-200 space-y-1">
            <li>Food Service</li>
            <li>Vaccination</li>
            <li>Veterinary Consultation</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Contact</h2>
          <ul className="text-gray-200 space-y-2">
            <li className="flex items-center gap-2"><FaPhone /> +1 (555) 123-4567</li>
            <li className="flex items-center gap-2"><FaEnvelope /> info@dogcare.com</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> New York, NY</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Follow Us</h2>
          <div className="flex gap-3 text-2xl text-blue-300">
            <FaFacebookSquare />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>

      </div>
      <div className="border-t border-gray-400 mt-8 pt-4 text-center text-gray-200 text-sm">
        © 2024 Dog Care. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
