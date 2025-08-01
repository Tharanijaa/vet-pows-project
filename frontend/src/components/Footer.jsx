// import React, { useState } from 'react';
// import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';


// const Footer = () => {
//   const currentYear = new Date().getFullYear();
//   const [showContactModal, setShowContactModal] = useState(false);
//   const [contactName, setContactName] = useState("");
//   const [contactEmail, setContactEmail] = useState("");
//   const [contactMessage, setContactMessage] = useState("");

//   // Reset form fields when opening modal
//   const openContactModal = () => {
//     setContactName("");
//     setContactEmail("");
//     setContactMessage("");
//     setShowContactModal(true);
//   };
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleContactSubmit = (e) => {
//     e.preventDefault();
//     // You can send the data to your backend here
//     setShowContactModal(false);
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 2500);
//   };

//   return (
//     <footer className="bg-[#8B4513] text-white py-8">
//       <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* ...existing code... */}
//         <div>
//           <h2 className="text-lg font-bold flex items-center gap-2">
//             🐶 Dog Care
//           </h2>
//           <p className="text-gray-200 mt-2">Your dog's health is our priority</p>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mb-2">Services</h2>
//           <ul className="text-gray-200 space-y-1">
//             <li>Food Service</li>
//             <li>Vaccination</li>
//             <li>Veterinary Consultation</li>
//           </ul>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mb-2">Contact</h2>
//           <ul className="text-gray-200 space-y-2">
//             <li className="flex items-center gap-2">
//               <FaPhone />
//               <a
//                 className="underline hover:text-blue-200"
//             href='tel:94776111210'
//               >
//                 94776111210
//               </a>
//             </li>
//             <li className="flex items-center gap-2">
//               <FaEnvelope />
//               <button
//                 className="underline hover:text-blue-200"
//                 onClick={openContactModal}
//                 style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}
//               >
//                 jeyatharu488@gmsil.com
//               </button>
//             </li>
//             <li className="flex items-center gap-2"><FaMapMarkerAlt /> jaffna</li>
//           </ul>
//         </div>
//         <div>
//           <h2 className="text-lg font-bold mb-2">Follow Us</h2>
//           <div className="flex gap-3 text-2xl text-blue-300">
//             <FaFacebookSquare />
//             <FaInstagram />
//             <FaTwitter />
//           </div>
//         </div>
//       </div>
//       <div className="border-t border-gray-400 mt-8 pt-4 text-center text-gray-200 text-sm">
//         © {currentYear} Dog Care. All rights reserved.
//       </div>

//       {/* Contact Modal */}
//       {/* {showContactModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
//             <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Us</h2>
//             <form className="space-y-4" onSubmit={handleContactSubmit}>
//               <div>
//                 <label className="block text-gray-700 mb-1">Your Name</label>
//                 <input
//                   type="text"
//                   className="w-full border rounded px-3 py-2"
//                   placeholder="Enter your name"
//                   value={contactName}
//                   onChange={e => setContactName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Your Email</label>
//                 <input
//                   type="email"
//                   className="w-full border rounded px-3 py-2"
//                   placeholder="Enter your email"
//                   value={contactEmail}
//                   onChange={e => setContactEmail(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Message</label>
//                 <textarea
//                   className="w-full border rounded px-3 py-2"
//                   rows="4"
//                   placeholder="Type your message"
//                   value={contactMessage}
//                   onChange={e => setContactMessage(e.target.value)}
//                 />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
//                   onClick={() => setShowContactModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
//                 >
//                   Send
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )} */}
//     {showSuccess && (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//         <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
//           <h2 className="text-xl font-bold mb-4 text-green-700">Message Sent!</h2>
//           <p className="text-gray-700">Thank you for contacting us. We'll get back to you soon.</p>
//         </div>
//       </div>
//     )}
//     </footer>
//   );
// };

// export default Footer;


import React, { useState } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const openContactModal = () => {
    setContactName("");
    setContactEmail("");
    setContactMessage("");
    setShowContactModal(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setShowContactModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  const socialIcons = [
    { icon: <FaFacebookSquare />, color: "text-amber-700 hover:text-amber-600" },
    { icon: <FaInstagram />, color: "text-amber-700 hover:text-amber-600" },
    { icon: <FaTwitter />, color: "text-amber-700 hover:text-amber-600" }
  ];

  return (
    <footer className="relative bg-amber-900 text-white py-12 overflow-hidden">
      {/* Background dog image */}
      <div 
        className="absolute inset-0 bg-[url('/assets/dog-footer.jpg')] bg-cover bg-center opacity-20"
        style={{ backgroundSize: "50% auto" }}
      ></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold flex items-center gap-2">
            <motion.span 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🐶
            </motion.span>
            Dog Care
          </h2>
          <p className="text-amber-100 mt-2">Your dog's health is our priority</p>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold mb-3">Services</h2>
          <ul className="text-amber-100 space-y-2">
            {['Food Service', 'Vaccination', 'Veterinary Consultation'].map((service, index) => (
              <motion.li 
                key={index}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {service}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <ul className="text-amber-100 space-y-3">
            <motion.li 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <FaPhone className="text-amber-400" />
              <a href="tel:94776111210" className="underline hover:text-amber-300">
                94776111210
              </a>
            </motion.li>
            <motion.li 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <FaEnvelope className="text-amber-400" />
              <button
                onClick={openContactModal}
                className="underline hover:text-amber-300 text-left"
                style={{ background: 'none', border: 'none', padding: 0, color: 'inherit', cursor: 'pointer' }}
              >
                jeyatharu488@gmail.com
              </button>
            </motion.li>
            <motion.li 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <FaMapMarkerAlt className="text-amber-400" /> 
              <span>Jaffna</span>
            </motion.li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-bold mb-3">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className={`${social.color} transition-colors`}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div 
        className="relative z-10 border-t border-amber-700 mt-8 pt-4 text-center text-amber-100 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        © {currentYear} Dog Care. All rights reserved.
      </motion.div>

      {/* Contact Modal */}
      {showContactModal && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold mb-4 text-amber-900">Contact Us</h2>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div>
                <label className="block text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your name"
                  value={contactName}
                  onChange={e => setContactName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your email"
                  value={contactEmail}
                  onChange={e => setContactEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  rows="4"
                  placeholder="Type your message"
                  value={contactMessage}
                  onChange={e => setContactMessage(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <motion.button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowContactModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-xl font-bold mb-4 text-green-600">Message Sent!</h2>
            <p className="text-gray-700">Thank you for contacting us. We'll get back to you soon.</p>
            <motion.button
              className="mt-4 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded"
              onClick={() => setShowSuccess(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </footer>
  );
};

export default Footer;