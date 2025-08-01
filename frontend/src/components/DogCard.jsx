import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiForkKnifeSpoon, GiSyringe } from 'react-icons/gi';

const DogCard = ({ dog, onFetchSuggestions }) => {
  const navigate = useNavigate(); // ✅ Moved inside the component

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold">{dog.name}</h3>
      <p className="text-sm text-gray-600">Breed: {dog.breed}</p>
      <p className="text-sm text-gray-600">Age: {dog.age} months</p>

      {/* Suggestion Buttons */}
      <div className="mt-3 flex gap-4">
        <button
          onClick={() => onFetchSuggestions(dog, 'food')}
          className="bg-amber-200 text-amber-900 px-12 py-2 rounded text-sm hover:bg-amber-300 flex items-center gap-2"
        >
          <GiForkKnifeSpoon size={20} />
          View Food
        </button>

        <button
          onClick={() => onFetchSuggestions(dog, 'vaccination')}
          className="bg-amber-100 text-red-800 px-12 py-2 rounded text-sm hover:bg-red-200"
        >
          <GiSyringe size={20} />
          View Vaccines
        </button>
      </div>
{/* 
      View Details Button
      <div className="mt-4 flex justify-center">
        <button

          onClick={() => navigate('/DogList')}

          className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-2 rounded-lg text-sm shadow-md"
        >
          👁 View Details
        </button>
      </div> */}
    </div>
  );
  
};

export default DogCard;



