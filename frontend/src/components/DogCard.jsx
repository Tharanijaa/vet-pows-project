import React, { useState } from 'react';
import axios from 'axios';
import DogSuggestionModal from './DogSuggestionModal';

const API_URL = import.meta.env.VITE_API_URL;

const DogCard = ({ dog }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [suggestionType, setSuggestionType] = useState('food');
  const [suggestions, setSuggestions] = useState(null);

  const fetchSuggestions = async (type) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`${API_URL}/animals/suggestions/${dog._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuggestionType(type);
      setSuggestions(res.data);
      setModalOpen(true);
    } catch (err) {
      alert('Error fetching suggestions');
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-bold text-gray-800 mb-1">{dog.name}</h3>
      <p className="text-sm text-gray-600 mb-1">{dog.breed}</p>
      <div className="flex gap-2 text-xs mb-3">
        <span className="bg-gray-100 px-2 py-1 rounded">{dog.age} months</span>
        <span className="bg-gray-100 px-2 py-1 rounded capitalize">{dog.gender}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => fetchSuggestions('food')}
          className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded"
        >
          🍽 Food
        </button>
        <button
          onClick={() => fetchSuggestions('vaccination')}
          className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded"
        >
          💉 Vaccination
        </button>
      </div>

      <DogSuggestionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        dog={dog}
        suggestions={suggestions}
        type={suggestionType}
      />
    </div>
  );
};

export default DogCard;
