// import React from "react";
// import { Link , useLocation} from "react-router-dom";

// const scrollToSection = (id) => {
//   const section = document.getElementById(id);
//   if (section) {
//     section.scrollIntoView({ behavior: "smooth" });
//   }
// };

// const Navbar = () => {

//     const location = useLocation();

//   // Helper to handle section navigation
//   const handleSectionClick = (e, id) => {
//     e.preventDefault();
//     if (location.pathname !== "/") {
//       window.location.href = `/#${id}`;
//     } else {
//       scrollToSection(id);
//     }
//   };

//   return (
//     <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
//       {/* Logo */}
//       <div className="flex items-center space-x-2">
//         <img src="/public/assets/logo.jpg" alt="Logo" className="w-6 h-6" />
//         <span className="text-xl font-bold text-gray-800">Vet Paws</span>
//       </div>

//       {/* Menu Links */}

//             <div className="space-x-6">
//         <Link to="/" className="hover:text-orange-700 font-medium">Home</Link>
//         <Link to="/" onClick={e => handleSectionClick(e, "services")} className="text-black transition">Services</Link>
//         <Link to="/" onClick={e => handleSectionClick(e, "whoweare")} className="text-black transition">Who we Are</Link>
//         <Link to="/" onClick={e => handleSectionClick(e, "howitworks")} className="text-black transition">How it Works</Link>
//         <Link to="/" onClick={e => handleSectionClick(e, "contact")} className="text-black transition">Contact</Link>
//         <Link to="/login" className="bg-orange-700 hover:bg-orange-800 text-white font-medium px-4 py-2 rounded transition">Login</Link>
        
        
//       </div>

//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

// Smooth scroll to section
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch user from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userid");

    if (token && role && userId) {
      setUser({ name: role.toUpperCase(), role, email: `${role}@vetpaws.com` }); // You can customize this based on real user data
    } else {
      setUser(null);
    }
  }, [location.pathname]); // Refresh user info on route change

  // Handle scroll or navigate
  const handleSectionClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      scrollToSection(id);
    }
  };

  // Logout logic
  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center z-50 sticky top-0">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/assets/logo.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
        <span className="text-xl font-bold text-gray-800">Vet Paws</span>
      </div>

      {/* Menu */}
      <div className="space-x-6 flex items-center">
        <Link to="/" className="hover:text-orange-700 font-medium">Home</Link>
        <Link to="/" onClick={(e) => handleSectionClick(e, "services")} className="hover:text-orange-700">Services</Link>
        <Link to="/" onClick={(e) => handleSectionClick(e, "whoweare")} className="hover:text-orange-700">Who We Are</Link>
        <Link to="/" onClick={(e) => handleSectionClick(e, "howitworks")} className="hover:text-orange-700">How It Works</Link>
        {/* <Link to="/" onClick={(e) => handleSectionClick(e, "contact")} className="hover:text-orange-700">Contact</Link> */}

        {!user ? (
          <Link
            to="/login"
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
          >
            Login
          </Link>
        ) : (
          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 cursor-pointer bg-yellow-500 px-4 py-2 rounded-full text-white font-medium shadow"
            >
              <FaUserCircle className="text-xl" />
              <span>{user.name?.split(" ")[0] || "User"}</span>
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-md z-50 p-4 text-sm">
                <div className="mb-3">
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="text-gray-400 capitalize">{user.role}</p>
                </div>
                <hr className="my-2" />
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate(`/${user.role}-dashboard`);
                  }}
                  className="w-full text-left px-3 py-2 text-blue-600 hover:bg-gray-100 rounded"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-white hover:bg-red-600 px-3 py-2 rounded transition"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
