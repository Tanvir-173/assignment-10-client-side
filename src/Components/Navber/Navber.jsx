import React, { useState } from 'react';
import { Link } from 'react-router';

const Navbar = ({ user, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-orange-600">
        Local Food Lovers
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <Link to="/explore" className="hover:text-orange-500">Explore</Link>

        {!user && (
          <>
            <Link to="/login" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Login</Link>
            <Link to="/register" className="px-4 py-2 border border-orange-500 rounded hover:bg-orange-100">Register</Link>
          </>
        )}

        {user && (
          <div className="relative">
            <img
              src={user.photoURL || '/default-avatar.png'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded border">
                <Link to="/add-review" className="block px-4 py-2 hover:bg-orange-100">Add Review</Link>
                <Link to="/my-reviews" className="block px-4 py-2 hover:bg-orange-100">My Reviews</Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-orange-100"
                >
                  Logout
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
