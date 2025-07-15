// src/pages/FoodRecommendation.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const FoodRecommendation = ({ breedId, ageInMonths }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (breedId && ageInMonths !== null) {
      axios
        .get(`http://localhost:5000/api/foods/recommend?breed=${breedId}&age=${ageInMonths}`)
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


// import React, { useState, useEffect } from "react";
// import axios from "../api/axios";

// const FoodRecommendation = () => {
//   const [foodList, setFoodList] = useState([]);
//   const [selectedFood, setSelectedFood] = useState(null);
//   const [showModal, setShowModal] = useState(false);
// useEffect(() => {
//   axios.get("/api/food")
//     .then(res => {
//       setFoodList(res.data);
//       console.log("Food list:", res.data);
//     })
//     .catch(err => {
//       console.error("Failed to fetch food list:", err);
//       setFoodList([]);
//     });
// }, []);
//   const handleFoodClick = async (foodId) => {
//     try {
//       const res = await axios.get(`/food/${foodId}`);
//       setSelectedFood(res.data);
//       console.log("Food details:", res.data);
//     } catch {
//       setSelectedFood(null);
//     }
//     setShowModal(true);
//   };

//   return (
//     <div>
//       <h2>Food Recommendations</h2>
//       <ul>
//         {foodList.length === 0 ? (
//           <li>No food suggestions found</li>
//         ) : (
//           foodList.map(food => (
//             <li key={food._id}>
//               <button onClick={() => handleFoodClick(food._id)}>
//                 {food.name}
//               </button>
//             </li>
//           ))
//         )}
//       </ul>

//       {showModal && (
//         <div className="modal">
//           <h3>Food Details</h3>
//           {selectedFood ? (
//             <>
//               <p>Name: {selectedFood.name}</p>
//               <p>Brand: {selectedFood.brand}</p>
//               <p>Ingredients: {selectedFood.ingredients}</p>
//             </>
//           ) : (
//             <p>No food details found</p>
//           )}
//           <button onClick={() => setShowModal(false)}>Close</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FoodRecommendation;