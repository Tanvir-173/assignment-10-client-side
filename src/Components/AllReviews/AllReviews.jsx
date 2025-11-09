// src/Components/AllReviews/AllReviews.jsx
import React, { useEffect, useState } from "react";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/reviews"); // your backend
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p className="text-center py-10">Loading reviews...</p>;
  if (reviews.length === 0) return <p className="text-center py-10 text-gray-500">No reviews yet.</p>;

  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white shadow rounded p-4 flex flex-col">
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
