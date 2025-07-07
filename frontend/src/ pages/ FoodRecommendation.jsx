// src/pages/FoodRecommendation.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const FoodRecommendation = ({ breedId, ageInMonths }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (breedId && ageInMonths !== null) {
      axios
        .get(`http://localhost:8000/api/foods/recommend?breed=${breedId}&age=${ageInMonths}`)
        .then((res) => {
          setFoods(res.data.foods || []);
        })
        .catch((err) => {
          console.error("Error fetching food:", err);
          setFoods([]);
        })
        .finally(() => setLoading(false));
    }
  }, [breedId, ageInMonths]);

  return (
    <section className="py-16 px-4 bg-white min-h-[50vh]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Recommended Food</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : foods.length > 0 ? (
          <ul className="mt-6 space-y-4 text-left text-gray-700">
            {foods.map((food, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                🍽️ {food}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No food suggestions found for this dog.</p>
        )}
      </div>
    </section>
  );
};

export default FoodRecommendation;
