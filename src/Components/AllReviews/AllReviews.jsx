// src/Components/AllReviews/AllReviews.jsx
import React, { useEffect, useState, useContext } from "react";
import Spinner from "../../Spinner/Spinner";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState([]); // Track favorited review IDs
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch all reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch reviews");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Fetch user favorites to prevent duplicates
  useEffect(() => {
    if (!user) return;
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`http://localhost:5000/favorites?email=${user.email}`);
        const data = await res.json();
        setFavoriteIds(data.map(fav => fav.reviewId));
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorites();
  }, [user]);

  // Handle Add to Favorites
  const handleFavorite = async (review) => {
    if (!user) {
      toast.error("Please login to add favorites!");
      return navigate("/login");
    }

    // Check if already favorited
    if (favoriteIds.includes(review._id)) {
      toast.info("Already in Favorites!");
      return;
    }

    const favoriteData = {
      reviewId: review._id,
      foodName: review.foodName,
      foodImage: review.foodImage,
      restaurantName: review.restaurantName,
      location: review.location,
      rating: review.rating,
      userEmail: user.email,
      date: review.date,
    };

    try {
      const res = await fetch("http://localhost:5000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(favoriteData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Added to Favorites!");
        setFavoriteIds(prev => [...prev, review._id]); // Update state
      } else {
        toast.info(data.message || "Already in Favorites!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to favorites");
    }
  };

  if (loading) return <Spinner />;
  if (reviews.length === 0) return <p className="text-center py-10 text-gray-500">No reviews yet.</p>;

  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white shadow rounded p-4 flex flex-col relative">

            {/* Favorite Button */}
            <button
              onClick={() => handleFavorite(review)}
              className={`absolute top-3 right-3 text-2xl ${favoriteIds.includes(review._id) ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
              title={favoriteIds.includes(review._id) ? "Already Favorited" : "Add to Favorites"}
            >
              ♥
            </button>

            <img src={review.foodImage} alt={review.foodName} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold">{review.foodName}</h3>
            <p className="text-gray-500">{review.restaurantName}</p>
            <p className="text-gray-500 mb-2">{review.location}</p>
            <p className="mb-2">Rating: {review.rating} ⭐</p>
            <p className="text-gray-700 mb-4">{review.reviewText}</p>
            <p className="text-sm text-gray-400">
              Posted by {review.userEmail} on {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllReviews;
