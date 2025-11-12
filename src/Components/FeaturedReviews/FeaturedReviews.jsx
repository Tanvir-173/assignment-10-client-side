import React from "react";
import Spinner from "../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FeaturedReviews = ({ products }) => {
  // Show spinner while loading or if products is undefined
  if (!products) return <Spinner />;

  if (products.length === 0) {
    return <p className="text-center mt-4 text-gray-500">No reviews found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
        </div>
      ))}
    </div>
  );
};

export default FeaturedReviews;
