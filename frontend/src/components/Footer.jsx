import React, { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Reset form fields when opening modal
  const openContactModal = () => {
    setContactName("");
    setContactEmail("");
    setContactMessage("");
    setShowContactModal(true);
  };
  const [showSuccess, setShowSuccess] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // You can send the data to your backend here
    setShowContactModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <footer className="bg-[#8B4513] text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* ...existing code... */}
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
            <li className="flex items-center gap-2">
              <FaPhone />
              <a
                className="underline hover:text-blue-200"
            href='tel:94776111210'
              >
                94776111210
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
              <button
                className="underline hover:text-blue-200"
                onClick={openContactModal}
                style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}
              >
                jeyatharu488@gmsil.com
              </button>
            </li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> jaffna</li>
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
        © {currentYear} Dog Care. All rights reserved.
      </div>

      {/* Contact Modal */}
      {/* {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Us</h2>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter your name"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Enter your email"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full border rounded px-3 py-2"
                  rows="4"
                  placeholder="Type your message"
                  value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowContactModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    {showSuccess && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-xl font-bold mb-4 text-green-700">Message Sent!</h2>
          <p className="text-gray-700">Thank you for contacting us. We'll get back to you soon.</p>
        </div>
      </div>
    )}
    </footer>
  );
};

export default Footer;
