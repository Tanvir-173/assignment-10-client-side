// src/Components/AddReview/AddReview.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const AddReview = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in to add a review!");
      navigate("/login");
    }
  }, [user, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    

    // if (!user) {
    //   // toast.error("You must be logged in to add a review!");
    //   return;
    // }

    setLoading(true);

    const reviewData = {
      foodName: e.target.foodName.value,
      foodImage: e.target.foodImage.value,
      restaurantName: e.target.restaurantName.value,
      location: e.target.location.value,
      rating: Number(e.target.rating.value),
      reviewText: e.target.reviewText.value,
      userEmail: user.email,         // logged-in user email
      date: new Date().toISOString() // current date
    };

    try {
      const res = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Review added successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to add review!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add review!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add Review</h2>
      {loading && <p>Submitting review...</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="foodName" placeholder="Food Name" required className="w-full h-12 px-3 border rounded" />
        <input type="text" name="foodImage" placeholder="Food Image URL" required className="w-full h-12 px-3 border rounded" />
        <input type="text" name="restaurantName" placeholder="Restaurant Name" required className="w-full h-12 px-3 border rounded" />
        <input type="text" name="location" placeholder="Location" required className="w-full h-12 px-3 border rounded" />
        <input type="number" name="rating" placeholder="Star Rating (1-5)" min="1" max="5" required className="w-full h-12 px-3 border rounded" />
        <textarea name="reviewText" placeholder="Your Review" required className="w-full px-3 border rounded h-24"></textarea>

        <button type="submit" className="w-full h-12 bg-orange-500 text-white rounded hover:bg-orange-600">
          Add Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
