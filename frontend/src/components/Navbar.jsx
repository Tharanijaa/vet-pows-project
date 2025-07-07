import React from "react";
import { Link , useLocation} from "react-router-dom";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {

    const location = useLocation();

  // Helper to handle section navigation
  const handleSectionClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      window.location.href = `/#${id}`;
    } else {
      scrollToSection(id);
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src="/public/assets/logo.jpg" alt="Logo" className="w-6 h-6" />
        <span className="text-xl font-bold text-gray-800">Vet Paws</span>
      </div>

      {/* Menu Links */}

            <div className="space-x-6">
        <Link to="/" className="hover:text-orange-700 font-medium">Home</Link>
        <Link to="/" onClick={e => handleSectionClick(e, "services")} className="text-black transition">Services</Link>
        <Link to="/" onClick={e => handleSectionClick(e, "whoweare")} className="text-black transition">Who we Are</Link>
        <Link to="/" onClick={e => handleSectionClick(e, "howitworks")} className="text-black transition">How it Works</Link>
        <Link to="/" onClick={e => handleSectionClick(e, "contact")} className="text-black transition">Contact</Link>
        <Link to="/login" className="bg-orange-700 hover:bg-orange-800 text-white font-medium px-4 py-2 rounded transition">Login</Link>
        
      </div>

    </nav>
  );
};

export default Navbar;
