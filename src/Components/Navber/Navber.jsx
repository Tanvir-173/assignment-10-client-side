import React, { useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user)
  // console.log(user?.photoURL)
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-orange-600">
        Local Food Lovers
      </Link>

      {/* Hamburger (Mobile) */}
      <button
        className="md:hidden block focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="w-6 h-0.5 bg-black mb-1"></div>
        <div className="w-6 h-0.5 bg-black mb-1"></div>
        <div className="w-6 h-0.5 bg-black"></div>
      </button>

      {/* Menu Items */}
      <div
        className={`flex-col md:flex md:flex-row md:items-center absolute md:static left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300
          ${menuOpen ? "top-16 px-6 pb-4" : "top-[-400px]"}`}
      >
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0 mt-3 md:mt-0">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/All-Reviews" className="hover:text-orange-500">All Reviews</Link>
        </div>

        {/* If Not Logged In */}
        {!user && (
          <div className="flex flex-col md:flex-row md:ml-4 space-y-3 md:space-y-0 md:space-x-3 mt-3 md:mt-0">
            <Link to="/login" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-center">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 border border-orange-500 rounded hover:bg-orange-100 text-center">
              Register
            </Link>
          </div>
        )}

        {/* If Logged In */}
        {user && (
          <div className="relative md:ml-4 mt-3 md:mt-0">
            <img
            referrerPolicy="no-referrer"
              src={user?.photoURL || "/default-avatar.png"}
              className="w-10 h-10 rounded-full cursor-pointer border"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-md border z-20">
                <Link to="/add-review" className="block px-4 py-2 hover:bg-gray-100">
                  Add Review
                </Link>
                <Link to="/my-reviews" className="block px-4 py-2 hover:bg-gray-100">
                  My Reviews
                </Link>

                {/* NEW MENU ITEM */}
                <Link to="/my-favorites" className="block px-4 py-2 hover:bg-gray-100">
                  My Favorites
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
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
