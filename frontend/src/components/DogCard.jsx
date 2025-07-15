import React, { useState } from 'react';
import axios from 'axios';
import DogSuggestionModal from './DogSuggestionModal';

const API_URL = import.meta.env.VITE_API_URL;

const DogCard = ({ dog, onFetchSuggestions }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold">{dog.name}</h3>
      <p className="text-sm text-gray-600">Breed: {dog.breed}</p>
      <p className="text-sm text-gray-600">Age: {dog.age} months</p>

      {/* Suggestion Buttons */}
      <div className="mt-3 flex gap-4">
     <button
  onClick={() => onFetchSuggestions(dog, 'food')}
  className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm hover:bg-green-200"
>
  🍽 View Food
</button>

<button
  onClick={() => onFetchSuggestions(dog, 'vaccination')}
  className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm hover:bg-red-200"
>
  💉 View Vaccines
</button>

      </div>
    </div>
  );
};

export default DogCard;


