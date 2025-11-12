import React from "react";
import Spinner from "../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const FeaturedReviews = ({ products }) => {
  const navigate = useNavigate();

  // Show spinner while loading or if products is undefined
  if (!products) return <Spinner />;

  if (products.length === 0) {
    return <p className="text-center mt-4 text-gray-500">No reviews found.</p>;
  }

  return (
    <div className="mt-8">
      {/* Grid of featured reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((review) => (
          <div key={review._id} className="bg-white shadow rounded p-4">
            <img
              src={review.foodImage || review.photoUrl}
              alt={review.foodName}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="font-bold text-xl">{review.foodName}</h3>
            <p>{review.restaurantName}</p>
            {review.location && <p>{review.location}</p>}
            <p>Reviewed by: {review.userEmail || review.reviewerName}</p>
            {review.rating && (
              <p>
                Rating: {review.rating}{" "}
                <FontAwesomeIcon icon={faStar} size="sm" className="text-yellow-500" />
              </p>
            )}

            {/* View Details button */}
            <button
              onClick={() => navigate(`/reviews/${review._id}`)}
              className="mt-3 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Show All button */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/All-Reviews")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Show All
        </button>
      </div>
    </div>
  );
};

export default FeaturedReviews;
