// pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-yellow-50 text-center p-4">
      <img
        src="https://i.imgur.com/9O7n8XU.png" // Fun food illustration
        alt="404 Foodie Error"
        className="w-80 mb-6"
      />
      <h1 className="text-5xl font-bold text-red-500 mb-2">404</h1>
      <p className="text-xl mb-4">Oops! Page not found.</p>
      <button
        onClick={() => navigate("/")}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
