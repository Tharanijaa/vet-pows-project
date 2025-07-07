// components/DogSuggestionModal.jsx
import React from 'react';

const DogSuggestionModal = ({ isOpen, onClose, dog, suggestions, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {type === 'food' ? '🍽 Food Recommendations' : '💉 Vaccination Schedule'}
        </h2>

        {type === 'food' ? (
          <ul className="list-disc ml-6 text-sm text-green-700">
            {suggestions?.food?.length > 0 ? (
              suggestions.food.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>No food suggestions found</li>
            )}
          </ul>
        ) : (
          <ul className="list-disc ml-6 text-sm text-red-700">
            {suggestions?.vaccinations?.length > 0 ? (
              suggestions.vaccinations.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>No vaccinations found</li>
            )}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DogSuggestionModal;
