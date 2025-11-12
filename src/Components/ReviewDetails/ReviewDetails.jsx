import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import Spinner from "../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ReviewDetails = () => {
  const { id } = useParams(); // review id from URL
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://assignment10-server-ruby-beta.vercel.app/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReview(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching review:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;

  if (!review) {
    return <p className="text-center text-gray-500 mt-6">Review not found.</p>;
  }
  console.log(review)
  console.log(review.photoUrl)
  return (
    <div className="max-w-3xl mx-auto my-10 bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={review.foodImage || review.photoUrl}
        alt={review.foodName}
        className="w-full h-80 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{review.foodName}</h2>
        <p className="text-gray-700 mb-2">Restaurant: {review.restaurantName}</p>
        {review.location && (
          <p className="text-gray-700 mb-2">Location: {review.location}</p>
        )}
        <p className="text-gray-700 mb-2">
          Reviewed by:{" "}
          <span className="font-semibold">
            {review.userEmail || review.reviewerName}
          </span>
        </p>

        {review.rating && (
          <p className="text-yellow-500 mb-3">
            Rating: {review.rating}{" "}
            <FontAwesomeIcon icon={faStar} size="sm" />
          </p>
        )}

        <p className="text-gray-800 mb-4">
          {review.reviewText || "No additional comments."}
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ReviewDetails;
