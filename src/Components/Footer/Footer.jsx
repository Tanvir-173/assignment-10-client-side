import React from "react";
import { Link } from "react-router";
// import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaXTwitter } from "react-icons/fa6";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import logo from "./food-lover-logo.jpg"

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Name */}
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
          <span className="font-bold text-xl">Local Food Lovers</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/explore" className="hover:text-orange-500">Explore</Link>
          <Link to="/add-review" className="hover:text-orange-500">Add Review</Link>
          <Link to="/my-reviews" className="hover:text-orange-500">My Reviews</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            <FaXTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
            <FontAwesomeIcon icon={faSquareInstagram} className="hover:text-pink-400 transition" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">
            <FontAwesomeIcon icon={faFacebook} size="lg" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-6">
        © 2025 Local Food Lovers Network. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
