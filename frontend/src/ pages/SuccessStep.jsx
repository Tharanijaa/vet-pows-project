import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessStep = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/user'); // 🔁 Adjust path if your dashboard route differs
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
      <p className="text-gray-600 mb-6">Your dog has been registered and payment completed successfully.</p>
      <button
        onClick={goToDashboard}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default SuccessStep;
