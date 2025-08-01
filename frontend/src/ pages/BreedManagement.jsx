import React, { useEffect, useState } from "react";
import api from "../api";

const BreedManagement = () => {
  const [breeds, setBreeds] = useState([]);
  const [form, setForm] = useState({
    breed: "",
    size: "",
    origin: "",
    lifespan: "",
  });

  // Fetch all breeds
  const fetchBreeds = async () => {
    try {
      const res = await api.get("/breeds");
      setBreeds(res.data);
    } catch (error) {
      console.error("Failed to fetch breeds", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/breeds", form);
      setForm({ breed: "", size: "", origin: "", lifespan: "" });
      fetchBreeds();
    } catch (err) {
      alert(err?.response?.data?.message || "Error adding breed");
    }
  };

  // Handle breed delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/breeds/${id}`);
      fetchBreeds();
    } catch (err) {
      alert("Error deleting breed");
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  return (
    <div className="p-4 min-h-screen" style={{ backgroundColor: "#ffe6f0" }}>
      <h2 className="text-2xl font-bold mb-4 text-black">Breed Management</h2>

      {/* Add Breed Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={form.breed}
          onChange={handleChange}
          required
          className="border p-2 rounded bg-white text-black"
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={form.size}
          onChange={handleChange}
          className="border p-2 rounded bg-white text-black"
        />
        <input
          type="text"
          name="origin"
          placeholder="Origin"
          value={form.origin}
          onChange={handleChange}
          className="border p-2 rounded bg-white text-black"
        />
        <input
          type="text"
          name="lifespan"
          placeholder="Lifespan"
          value={form.lifespan}
          onChange={handleChange}
          className="border p-2 rounded bg-white text-black"
        />
        <button
          type="submit"
          className="bg-pink-700 hover:bg-pink-800 text-white font-semibold p-2 rounded col-span-full"
        >
          Add Breed
        </button>
      </form>

      {/* Breed Dropdown (Admin Use) */}
      <div className="mb-6">
        <label className="block text-black font-medium mb-2">
          Select a Breed (Admin View Only)
        </label>
        <select className="p-2 border rounded bg-white text-black w-full md:w-1/2">
          <option value="">-- Select a breed --</option>
          {breeds.map((b) => (
            <option key={b._id} value={b._id}>
              {b.breed}
            </option>
          ))}
        </select>
      </div>

      {/* Breed Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-pink-400 bg-white text-black">
          <thead className="bg-pink-200">
            <tr>
              <th className="p-2 border border-pink-300">ID</th>
              <th className="p-2 border border-pink-300">Breed</th>
              <th className="p-2 border border-pink-300">Size</th>
              <th className="p-2 border border-pink-300">Origin</th>
              <th className="p-2 border border-pink-300">Lifespan</th>
              <th className="p-2 border border-pink-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {breeds.map((b) => (
              <tr key={b._id} className="text-center">
                <td className="border border-pink-300 p-2 text-xs break-words">
                  {b._id}
                </td>
                <td className="border border-pink-300 p-2">{b.breed}</td>
                <td className="border border-pink-300 p-2">{b.size || "-"}</td>
                <td className="border border-pink-300 p-2">{b.origin || "-"}</td>
                <td className="border border-pink-300 p-2">{b.lifespan || "-"}</td>
                <td className="border border-pink-300 p-2">
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {breeds.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No breeds available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BreedManagement;
