// // src/components/VaccinationManagement.jsx
// import React, { useEffect, useState } from "react";
// import api from "../api"; // Your Axios instance

// const VaccinationManagement = () => {
//   const [vaccinations, setVaccinations] = useState([]);
//   const [breeds, setBreeds] = useState([]);
//   const [form, setForm] = useState({
//     breed: "",
//     vaccine: "",
//     ageInWeeksMin: "",
//     ageInWeeksMax: "",
//   });

//   useEffect(() => {
//     fetchVaccinations();
//     fetchBreeds();
//   }, []);

//   const fetchVaccinations = async () => {
//     try {
//       const res = await api.get("vaccinations");
//       setVaccinations(res.data);
//     } catch (err) {
//       console.error("Error fetching vaccinations:", err);
//     }
//   };

//   const fetchBreeds = async () => {
//     try {
//       const res = await api.get("/breeds");
//       setBreeds(res.data);
//     } catch (err) {
//       console.error("Error fetching breeds:", err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/api/vaccinations", form);
//       setForm({ breed: "", vaccine: "", ageInWeeksMin: "", ageInWeeksMax: "" });
//       fetchVaccinations();
//     } catch (err) {
//       alert(err.response?.data?.message || "Error creating vaccination");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/api/vaccinations/${id}`);
//       fetchVaccinations();
//     } catch (err) {
//       console.error("Error deleting:", err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Vaccination Management</h2>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <select
//           name="breed"
//           value={form.breed}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         >
//           <option value="">Select Breed</option>
//           {breeds.map((b) => (
//             <option key={b._id} value={b._id}>{b.breed}</option>
//           ))}
//         </select>

//         <input
//           type="text"
//           name="vaccine"
//           placeholder="Vaccine Name"
//           value={form.vaccine}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />

//         <input
//           type="number"
//           name="ageInWeeksMin"
//           placeholder="Min Age (weeks)"
//           value={form.ageInWeeksMin}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />

//         <input
//           type="number"
//           name="ageInWeeksMax"
//           placeholder="Max Age (weeks)"
//           value={form.ageInWeeksMax}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />

//         <button type="submit" className="bg-green-600 text-white p-2 rounded col-span-full">
//           Add Vaccination
//         </button>
//       </form>

//       <table className="w-full border table-auto text-center">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Breed</th>
//             <th className="border p-2">Vaccine</th>
//             <th className="border p-2">Age (Min-Max)</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vaccinations.map((v) => (
//             <tr key={v._id}>
//               <td className="border p-2">{v.breed?.breed || "Breed ID: " + v.breed}</td>
//               <td className="border p-2">{v.vaccine}</td>
//               <td className="border p-2">
//                 {v.ageInWeeksMin} - {v.ageInWeeksMax} weeks
//               </td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => handleDelete(v._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VaccinationManagement;




// import React, { useEffect, useState } from "react";
// import api from "../api";

// const VaccinationManagement = () => {
//   const [vaccinations, setVaccinations] = useState([]);
//   const [breeds, setBreeds] = useState([]);
//   const [form, setForm] = useState({
//     breed: "",
//     vaccine: "",
//     ageInWeeksMin: "",
//     ageInWeeksMax: "",
//   });

//   useEffect(() => {
//     fetchVaccinations();
//     fetchBreeds();
//   }, []);

//   const fetchVaccinations = async () => {
//     try {
//       const res = await api.get("/vaccinations");
//       setVaccinations(res.data);
//     } catch (err) {
//       console.error("Error fetching vaccinations:", err);
//     }
//   };

//   const fetchBreeds = async () => {
//     try {
//       const res = await api.get("/breeds id");
//       setBreeds(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       setBreeds([]);
//       console.error("Error fetching breeds:", err);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/vaccinations", {
//         ...form,
//         ageInWeeksMin: Number(form.ageInWeeksMin),
//         ageInWeeksMax: Number(form.ageInWeeksMax),
//       });
//       setForm({ breed: "", vaccine: "", ageInWeeksMin: "", ageInWeeksMax: "" });
//       fetchVaccinations();
//     } catch (err) {
//       console.error("Submit Error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Error creating vaccination");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this vaccination entry?")) return;
//     try {
//       await api.delete(`/vaccinations/${id}`);
//       fetchVaccinations();
//     } catch (err) {
//       console.error("Error deleting:", err);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4 text-green-800">Vaccination Management</h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-green-50 p-4 rounded">
//         <select
//           name="breed"
//           value={form.breed}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         >
//           <option value="">Select Breed</option>
//           {breeds.map((b) => (
//             <option key={b._id} value={b._id}>
//               {b.breed || b.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           name="vaccine"
//           placeholder="Vaccine Name"
//           value={form.vaccine}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />

//         <input
//           type="number"
//           name="ageInWeeksMin"
//           placeholder="Min Age (weeks)"
//           value={form.ageInWeeksMin}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />

//         <input
//           type="number"
//           name="ageInWeeksMax"
//           placeholder="Max Age (weeks)"
//           value={form.ageInWeeksMax}
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />

//         <button type="submit" className="bg-green-600 text-white p-2 rounded col-span-full hover:bg-green-700">
//           Add Vaccination
//         </button>
//       </form>

//       {/* Table */}
//       <table className="w-full border table-auto text-center">
//         <thead className="bg-green-100">
//           <tr>
//             <th className="border p-2">Breed</th>
//             <th className="border p-2">Vaccine</th>
//             <th className="border p-2">Age (Min-Max)</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vaccinations.map((v) => (
//             <tr key={v._id}>
//               <td className="border p-2">
//                 {v.breed?.breed || v.breed?.name || breeds.find((b) => b._id === v.breed)?.breed || "Breed ID: " + v.breed}
//               </td>
//               <td className="border p-2">{v.vaccine}</td>
//               <td className="border p-2">
//                 {v.ageInWeeksMin} - {v.ageInWeeksMax} weeks
//               </td>
//               <td className="border p-2">
//                 <button
//                   onClick={() => handleDelete(v._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default VaccinationManagement;





import React, { useEffect, useState } from "react";
import api from "../api";

const VaccinationManagement = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(""); // breed ID selected in dropdown
  const [vaccinations, setVaccinations] = useState([]);
  const [form, setForm] = useState({
    vaccine: "",
    ageInWeeksMin: "",
    ageInWeeksMax: "",
  });

  // Fetch all breeds on mount
  useEffect(() => {
    fetchBreeds();
  }, []);

  // Fetch vaccinations when selectedBreed changes
  useEffect(() => {
    if (selectedBreed) {
      fetchVaccinationsByBreed(selectedBreed);
    } else {
      setVaccinations([]); // Clear vaccinations if no breed selected
    }
  }, [selectedBreed]);

  // Fetch breeds for dropdown
  const fetchBreeds = async () => {
    try {
      const res = await api.get("/breeds");
      setBreeds(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setBreeds([]);
      console.error("Error fetching breeds:", err);
    }
  };

  // Fetch vaccinations for a specific breed
  const fetchVaccinationsByBreed = async (breedId) => {
    try {
      // Assuming your backend supports query param breed to filter vaccinations
      const res = await api.get(`/vaccinations?breed=${breedId}`);
      setVaccinations(res.data);
    } catch (err) {
      console.error("Error fetching vaccinations:", err);
      setVaccinations([]);
    }
  };

  // Form input change handler
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Breed dropdown change handler
  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
    setForm({ vaccine: "", ageInWeeksMin: "", ageInWeeksMax: "" }); // reset form on breed change
  };

  // Add new vaccination for selected breed
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBreed) {
      alert("Please select a breed first.");
      return;
    }

    if (!form.vaccine || !form.ageInWeeksMin || !form.ageInWeeksMax) {
      alert("Please fill in all vaccination details.");
      return;
    }

    try {
      const payload = {
        breed: selectedBreed,
        vaccine: form.vaccine,
        ageInWeeksMin: Number(form.ageInWeeksMin),
        ageInWeeksMax: Number(form.ageInWeeksMax),
      };

      await api.post("/vaccinations", payload);
      alert("Vaccination added successfully.");
      setForm({ vaccine: "", ageInWeeksMin: "", ageInWeeksMax: "" });
      fetchVaccinationsByBreed(selectedBreed);
    } catch (err) {
      console.error("Error adding vaccination:", err);
      alert(err.response?.data?.message || "Failed to add vaccination.");
    }
  };

  // Delete vaccination
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vaccination?")) return;

    try {
      await api.delete(`/vaccinations/${id}`);
      fetchVaccinationsByBreed(selectedBreed);
    } catch (err) {
      console.error("Error deleting vaccination:", err);
      alert("Failed to delete vaccination.");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-800">Vaccination Management</h2>

      {/* Breed selection */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Select Dog Breed:</label>
        <select
          value={selectedBreed}
          onChange={handleBreedChange}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Select Breed --</option>
          {breeds.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name || b.breed}
            </option>
          ))}
        </select>
      </div>

      {/* Add Vaccination Form */}
      {selectedBreed && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            name="vaccine"
            placeholder="Vaccine Name"
            value={form.vaccine}
            onChange={handleFormChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="ageInWeeksMin"
            placeholder="Min Age (weeks)"
            value={form.ageInWeeksMin}
            onChange={handleFormChange}
            className="border p-2 rounded"
            min="0"
            required
          />
          <input
            type="number"
            name="ageInWeeksMax"
            placeholder="Max Age (weeks)"
            value={form.ageInWeeksMax}
            onChange={handleFormChange}
            className="border p-2 rounded"
            min="0"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded col-span-full hover:bg-green-700"
          >
            Add Vaccination
          </button>
        </form>
      )}

      {/* Vaccinations Table */}
      <table className="w-full table-auto border border-gray-300 text-center">
        <thead className="bg-green-100">
          <tr>
            <th className="border p-2">Vaccine</th>
            <th className="border p-2">Age Range (weeks)</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vaccinations.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-gray-500">
                No vaccinations found for this breed.
              </td>
            </tr>
          ) : (
            vaccinations.map((v) => (
              <tr key={v._id} className="hover:bg-green-50">
                <td className="border p-2">{v.vaccine}</td>
                <td className="border p-2">
                  {v.ageInWeeksMin} - {v.ageInWeeksMax}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(v._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VaccinationManagement;


