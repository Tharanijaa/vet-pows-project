// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddDogModal = ({ isOpen, onClose, onDogAdded }) => {
//   const [form, setForm] = useState({
//     name: '',
//     breed: '',
//     age: '',
//     gender: '',
//     weight: '',
//     healthIssues: '',
//     profilePic: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [breeds, setBreeds] = useState([]);
//   const API_URL = import.meta.env.VITE_API_URL;

//   // 👇 Fetch all breeds from backend
//   useEffect(() => {
//     axios
//       .get(`${API_URL}/breeds`)
//       .then(res => setBreeds(res.data))
//       .catch(err => console.error("Breed fetch failed:", err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');

//       const payload = {
//         ...form,
//         age: parseInt(form.age),
//         healthIssues: form.healthIssues
//           ? form.healthIssues.split(',').map(i => i.trim())
//           : [],
//         species: 'Dog'
//       };

//       await axios.post(`${API_URL}/animals/add`, payload, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setForm({
//         name: '',
//         breed: '',
//         age: '',
//         gender: '',
//         weight: '',
//         healthIssues: '',
//         profilePic: ''
//       });

//       onDogAdded();
//       onClose();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Error registering dog.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Register New Dog</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input name="name" placeholder="Dog Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />

//           {/* ✅ Replace input with dynamic dropdown */}
//           <select name="breed" value={form.breed} onChange={handleChange} className="w-full border p-2 rounded" required>
//             <option value="">Select Breed</option>
//             {breeds.map(breed => (
//               <option key={breed._id} value={breed._id}>
//                 {breed.breed}
//               </option>
//             ))}
//           </select>

//           <input name="age" type="number" placeholder="Age in Months" value={form.age} onChange={handleChange} className="w-full border p-2 rounded" required />
//           <select name="gender" value={form.gender} onChange={handleChange} className="w-full border p-2 rounded" required>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           <input name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} className="w-full border p-2 rounded" />
//           <input name="healthIssues" placeholder="Health Issues (comma-separated)" value={form.healthIssues} onChange={handleChange} className="w-full border p-2 rounded" />
//           <input name="profilePic" placeholder="Profile Picture URL" value={form.profilePic} onChange={handleChange} className="w-full border p-2 rounded" />

//           <div className="flex justify-between pt-2">
//             <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
//             <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
//               {loading ? 'Registering...' : 'Register'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDogModal;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddDogModal = () => {
//   const [form, setForm] = useState({
//     name: '',
//     breed: '',
//     age: '',
//     gender: '',
//     weight: '',
//     healthIssues: '',
//     profilePic: ''
//   });

//   const [breeds, setBreeds] = useState([]);
//   const navigate = useNavigate();
//   const API_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     axios.get(`${API_URL}/breeds`)
//       .then(res => setBreeds(res.data))
//       .catch(err => console.error('Failed to load breeds:', err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const payload = {
//         ...form,
//         age: parseInt(form.age),
//         healthIssues: form.healthIssues
//           ? form.healthIssues.split(',').map(i => i.trim())
//           : [],
//         species: 'Dog'
//       };

//       const res = await axios.post(`${API_URL}/animals/add`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       const dogId = res.data._id;
//       navigate(`/register/payment/${dogId}`); // 👈 go to payment step with dogId
//     } catch (err) {
//       alert(err.response?.data?.message || 'Error registering dog');
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Step 1 of 2: Dog Information</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input name="name" placeholder="Dog Name" required value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />

//         <select name="breed" required value={form.breed} onChange={handleChange} className="w-full border p-2 rounded">
//           <option value="">Select Breed</option>
//           {breeds.map(b => <option key={b._id} value={b._id}>{b.breed}</option>)}
//         </select>

//         <input name="age" type="number" placeholder="Age (months)" required value={form.age} onChange={handleChange} className="w-full border p-2 rounded" />
//         <select name="gender" required value={form.gender} onChange={handleChange} className="w-full border p-2 rounded">
//           <option value="">Gender</option>
//           <option>Male</option>
//           <option>Female</option>
//         </select>
//         <input name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} className="w-full border p-2 rounded" />
//         <input name="healthIssues" placeholder="Health Issues (comma-separated)" value={form.healthIssues} onChange={handleChange} className="w-full border p-2 rounded" />
//         <input name="profilePic" placeholder="Profile Picture URL" value={form.profilePic} onChange={handleChange} className="w-full border p-2 rounded" />

//         <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Next: Payment</button>
//       </form>
//     </div>
//   );
// };

// export default AddDogModel;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // ✅ Add this line
// import axios from 'axios';

// const AddDogModal = ({ isOpen, onClose, onDogAdded }) => {
//   const navigate = useNavigate(); // ✅ Navigation hook

//   const [form, setForm] = useState({
//     name: '',
//     breed: '',
//     age: '',
//     gender: '',
//     weight: '',
//     healthIssues: '',
//     profilePic: '',
//      amount: 500
//   });

//   const [loading, setLoading] = useState(false);
//   const [breeds, setBreeds] = useState([]);
//   const API_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/breeds`)
//       .then(res => setBreeds(res.data))
//       .catch(err => console.error("Breed fetch failed:", err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');

//       const payload = {
//         ...form,
//         age: parseInt(form.age),
//         amount: 500,
//         healthIssues: form.healthIssues
//           ? form.healthIssues.split(',').map(i => i.trim())
//           : [],
//         species: 'Dog'
//       };

//       await axios.post(`${API_URL}/animals/add`, payload, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setForm({
//         name: '',
//         breed: '',
//         age: '',
//         gender: '',
//         weight: '',
//         healthIssues: '',
//         profilePic: '',
//         amount: 500
//       });

//       onDogAdded();
//       onClose();

//       // ✅ After dog is registered, go to payment
//       navigate('/payment', { state: { amount: 500}}); // 👈 This line does the navigation

//     } catch (err) {
//       alert(err.response?.data?.message || 'Error registering dog.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">Register New Dog</h2>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <input name="name" placeholder="Dog Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />

//           <select name="breed" value={form.breed} onChange={handleChange} className="w-full border p-2 rounded" required>
//             <option value="">Select Breed</option>
//             {breeds.map(breed => (
//               <option key={breed._id} value={breed._id}>
//                 {breed.breed}
//               </option>
//             ))}
//           </select>

//           <input name="age" type="number" placeholder="Age in Months" value={form.age} onChange={handleChange} className="w-full border p-2 rounded" required />
//           <select name="gender" value={form.gender} onChange={handleChange} className="w-full border p-2 rounded" required>
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//           </select>
//           <input name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} className="w-full border p-2 rounded" />
//           <input name="healthIssues" placeholder="Health Issues (comma-separated)" value={form.healthIssues} onChange={handleChange} className="w-full border p-2 rounded" />
          
//     <div className="w-full border p-2 rounded bg-gray-100 text-gray-700">
//   Fixed Registration Amount: ₹500
// </div>

//           <input name="profilePic" placeholder="Profile Picture URL" value={form.profilePic} onChange={handleChange} className="w-full border p-2 rounded" />

//           <div className="flex justify-between pt-2">
//             <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
//             <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={loading}>
//               {loading ? 'Registering...' : 'Register'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDogModal;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AddDogModal = ({ isOpen, onClose, onDogAdded }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    breed: '',
    age: '',
    gender: '',
    weight: '',
    healthIssues: '',
    profilePic: '',
    amount: 500,
  });

  const [loading, setLoading] = useState(false);
  const [breeds, setBreeds] = useState([]);

  // Fetch available breeds on modal open
  useEffect(() => {
    if (isOpen) {
      axios
        .get(`${API_URL}/breeds`)
        .then((res) => setBreeds(res.data))
        .catch((err) => {
          console.error('Breed fetch failed:', err);
          alert('Failed to load dog breeds.');
        });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to register a dog.');
        return;
      }

      const payload = {
        ...form,
        age: parseInt(form.age),
        healthIssues: form.healthIssues
          ? form.healthIssues.split(',').map((item) => item.trim())
          : [],
        species: 'Dog',
      };

      await axios.post(`${API_URL}/animals/add`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Reset form and notify parent
      setForm({
        name: '',
        breed: '',
        age: '',
        gender: '',
        weight: '',
        healthIssues: '',
        profilePic: '',
        amount: 500,
      });

      onDogAdded(); // Callback to refresh list
      onClose();    // Close modal

      // Navigate to payment
      navigate('/payment', { state: { amount: 500 } });
    } catch (err) {
      console.error('Dog registration error:', err);
      alert(err.response?.data?.message || 'Error registering dog.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          &#x2715;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Register New Dog</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Dog Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="breed"
            value={form.breed}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Breed</option>
            {breeds.map((breed) => (
              <option key={breed._id} value={breed._id}>
                {breed.breed}
              </option>
            ))}
          </select>

          <input
            name="age"
            type="number"
            placeholder="Age in Months"
            value={form.age}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            name="weight"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="healthIssues"
            placeholder="Health Issues (comma-separated)"
            value={form.healthIssues}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="w-full border p-2 rounded bg-gray-100 text-gray-700">
            Fixed Registration Amount: ₹500
          </div>

          <input
            name="profilePic"
            placeholder="Profile Picture URL"
            value={form.profilePic}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDogModal;
