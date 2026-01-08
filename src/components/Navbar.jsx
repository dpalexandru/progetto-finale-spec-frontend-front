import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-indigo-600 shadow-md flex justify-between items-center navbar-sticky">
      {/* Logo o Titolo */}
      <Link to="/" className="text-white font-bold text-lg">
        DoggyDoggy
      </Link>

      {/* Link semplici */}
      <div className="flex gap-6 text-sm font-medium text-white">
        <Link to="/" className="hover:text-indigo-200 transition-colors">
          Home
        </Link>
        <Link to="/favorites" className="hover:text-indigo-200 transition-colors">
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;