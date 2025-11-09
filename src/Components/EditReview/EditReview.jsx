import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const EditReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState({
    foodName: "",
    reviewText: "",
    rating: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch review by ID
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(`http://localhost:5000/reviews/${id}`);
        if (!res.ok) throw new Error("Failed to fetch review");
        const data = await res.json();

        // Map backend fields to form state
        setReview({
          foodName: data.foodName || "",
          reviewText: data.reviewText || "",
          rating: data.rating || 0,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Error fetching review");
      }
    };
    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      if (!res.ok) throw new Error("Failed to update review");
      alert("Review updated successfully!");
      navigate("/my-reviews"); // Redirect after update
    } catch (err) {
      console.error(err);
      alert("Error updating review");
    }
  };

  if (loading) return <p>Loading review...</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Review</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="foodName"
          placeholder="Food Name"
          value={review.foodName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="reviewText"
          placeholder="Review"
          value={review.reviewText}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={review.rating}
          onChange={handleChange}
          className="border p-2 rounded"
          min="0"
          max="5"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Review
        </button>
      </form>
    </div>
  );
};

export default EditReview;
