import React from "react";

const DoctorServiceCard = () => {
  return (
    <div className="min-h-screen bg-[#fdfaf6] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <span className="text-6xl">🩺</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-orange-800 mb-2">
          Emergency Doctor
        </h2>
        <span className="text-sm bg-red-600 text-white px-3 py-1 rounded-full inline-block mb-4">
          24/7 Emergency
        </span>
        <p className="text-gray-700 text-base md:text-lg mb-6">
          Round-the-clock emergency veterinary services with experienced doctors ready to handle any urgent health situations for your pet.
        </p>

        <ul className="text-left text-sm text-gray-700 mb-6 list-disc list-inside mx-auto max-w-md">
          <li>24/7 emergency response</li>
          <li>Expert veterinarians</li>
          <li>Immediate medical care</li>
        </ul>

        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition">
          Emergency Call
        </button>
      </div>
    </div>
  );
};

export default DoctorServiceCard;
