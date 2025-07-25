// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/auth/login`,
//         { email, password },
//         { withCredentials: true } // Optional: needed if backend uses cookies
//       );

//       console.log("✅ Login response:", res.data);

//       const { role, token, _id } = res.data;

//       // Save auth info
//       localStorage.setItem('userRole', role);
//       localStorage.setItem('token', token);
//       localStorage.setItem('userid', _id);

//       // Navigate based on role
//       if (role === 'admin') {
//         navigate('/admin-dashboard');
//       } else if (role === 'user') {
//         navigate('/dog-dashboard');
//       } else if (role === 'Veterinarian') {
//         navigate('/doctor-dashboard');
//       } else {
//         navigate('/'); // Default redirect to homepage
//       }
//     } catch (err) {
//       console.error("❌ Login failed:", err.response?.data || err.message);

//       // Show appropriate message if login fails
//       if (err.response?.status === 401) {
//         setMessage('Invalid email or password.');
//       } else if (err.response?.status === 500) {
//         setMessage('Server error. Please try again later.');
//       } else {
//         setMessage('Login failed. Please check your credentials or try again later.');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
//       <main className="flex-grow flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Login to Your Account</h1>
//             <p className="text-gray-600">Access your health records and manage services</p>
//           </div>

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Email Address"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-gray-700 mb-2">
//                 Password <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                 placeholder="Password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="bg-orange-800 hover:bg-orange-900 text-white font-semibold py-2 px-4 rounded shadow transition w-full"
//             >
//               Login
//             </button>

//             {message && (
//               <p className="text-center text-sm mt-4 text-red-600">{message}</p>
//             )}
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-gray-600">
//               Don't have an account?
//               <a href="/signup" className="text-indigo-600 hover:text-indigo-800 ml-1 font-medium">
//                 Register here
//               </a>
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Login;

// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.post(
//       `${import.meta.env.VITE_API_URL}/auth/login`,
//       { email, password },
//       { withCredentials: true }
//     );

//     const { role, token, _id } = res.data;

//     if (!role || !token || !_id) {
//       throw new Error('Invalid response from server');
//     }

//     const normalizedRole = role.toLowerCase();

//     localStorage.setItem('userRole', normalizedRole);
//     localStorage.setItem('token', token);
//     localStorage.setItem('userid', _id);

//     if (normalizedRole === 'admin') {
//       navigate('/admin-dashboard');
//     } else if (normalizedRole === 'user') {
//       navigate('/dog-dashboard');
//     } else if (normalizedRole === 'veterinarian') {
//       navigate('/doctor-dashboard');
//     } else {
//       navigate('/');
//     }

//   } catch (err) {
//     console.error('Login failed:', err);

//     if (err.response?.status === 401) {
//       setMessage('Invalid email or password.');
//     } else if (err.message === 'Invalid response from server') {
//       setMessage('Server returned unexpected data. Please contact support.');
//     } else {
//       setMessage('Login failed. Please try again later.');
//     }
//   }
// };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    const { role, token, _id } = res.data;

    if (!role || !token || !_id) {
      throw new Error('Invalid response from server');
    }

    const normalizedRole = role.toLowerCase();
    console.log('Logged in role:', normalizedRole); // Debug output

    localStorage.setItem('userRole', normalizedRole);
    localStorage.setItem('token', token);
    localStorage.setItem('userid', _id);

    if (normalizedRole === 'admin') {
      navigate('/admin-dashboard');
    } else if (normalizedRole === 'veterinarian') {
      navigate('/doctor-dashboard');
    } else if (normalizedRole === 'user') {
      navigate('/dog-dashboard');
    } else {
      setMessage('Unknown role. Please contact support.');
    }

  } catch (err) {
    console.error('Login failed:', err);

    if (err.response?.status === 401) {
      setMessage('Invalid email or password.');
    } else if (err.message === 'Invalid response from server') {
      setMessage('Server returned unexpected data. Please contact support.');
    } else {
      setMessage('Login failed. Please try again later.');
    }
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Login to Your Account</h1>
            <p className="text-gray-600">Access your health records and manage services</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-orange-800 hover:bg-orange-900 text-white font-semibold py-2 px-4 rounded shadow transition w-full"
            >
              Login
            </button>

            {message && (
              <p className="text-center text-sm mt-4 text-red-600">{message}</p>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?
              <a href="/signup" className="text-indigo-600 hover:text-indigo-800 ml-1 font-medium">
                Register here
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

