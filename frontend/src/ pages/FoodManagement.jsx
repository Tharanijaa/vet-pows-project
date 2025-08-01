






import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const FoodManagement = () => {
  const [foods, setFoods] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [form, setForm] = useState({
    breed: "",
    ageInMonthsMin: "",
    ageInMonthsMax: "",
    foods: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all dog breeds
  const fetchBreeds = async () => {
    try {
      const res = await axios.get(`${API_URL}/breeds`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBreeds(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setBreeds([]);
      console.error("Error fetching breeds:", err);
    }
  };

  // Fetch all food entries
  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/food`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFoods(res.data);
      setError("");
    } catch (error) {
      console.error("Failed to fetch food data", error);
      setError(error.response?.data?.message || "Failed to load food data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreeds();
    fetchFoods();
  }, []);

  // Handle new food form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const payload = {
        breed: form.breed,
        ageInMonthsMin: Number(form.ageInMonthsMin),
        ageInMonthsMax: Number(form.ageInMonthsMax),
        foods: form.foods.split(",").map((item) => item.trim()),
      };

      const response = await axios.post(`${API_URL}/food`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setForm({ breed: "", ageInMonthsMin: "", ageInMonthsMax: "", foods: "" });
        fetchFoods();
      }
    } catch (err) {
      console.error("Error adding food", err);
      setError(err.response?.data?.message || "Failed to add food");
    }
  };

  // Handle deletion of food entry
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food entry?")) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/food/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFoods();
    } catch (err) {
      console.error("Failed to delete", err);
      setError(err.response?.data?.message || "Failed to delete food");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-orange-800">Food Management</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Food Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-orange-100 p-4 rounded"
      >
        <select
          value={form.breed}
          onChange={(e) => setForm({ ...form, breed: e.target.value })}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed._id} value={breed._id}>
              {breed.name || breed.breed}
            </option>
          ))}
          {breeds.length === 0 && <option disabled>No breeds available</option>}
        </select>

        <input
          type="number"
          placeholder="Age Min (months)"
          value={form.ageInMonthsMin}
          onChange={(e) => setForm({ ...form, ageInMonthsMin: e.target.value })}
          className="p-2 border rounded"
          min="0"
          required
        />
        <input
          type="number"
          placeholder="Age Max (months)"
          value={form.ageInMonthsMax}
          onChange={(e) => setForm({ ...form, ageInMonthsMax: e.target.value })}
          className="p-2 border rounded"
          min="0"
          required
        />
        <input
          type="text"
          placeholder="Foods (comma separated)"
          value={form.foods}
          onChange={(e) => setForm({ ...form, foods: e.target.value })}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>

      {/* Food Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-orange-600 text-center p-4">Loading...</div>
        ) : foods.length === 0 ? (
          <div className="text-orange-600 text-center p-4">No food items found.</div>
        ) : (
          <table className="min-w-full table-auto border border-orange-300 bg-white">
            <thead>
              <tr className="bg-orange-200 text-orange-900">
                <th className="p-2 border">Breed</th>
                <th className="p-2 border">Age Min</th>
                <th className="p-2 border">Age Max</th>
                <th className="p-2 border">Foods</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="hover:bg-orange-50">
                  <td className="p-2 border">
                    {food.breed?.name ||
                      food.breed?.breed ||
                      breeds.find((b) => b._id === food.breed)?.name ||
                      breeds.find((b) => b._id === food.breed)?.breed ||
                      "N/A"}
                  </td>
                  <td className="p-2 border">{food.ageInMonthsMin}</td>
                  <td className="p-2 border">{food.ageInMonthsMax}</td>
                  <td className="p-2 border">{food.foods.join(", ")}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FoodManagement;
