import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner"; // import your spinner component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const FeaturedReviews = ({ usersPromise }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Resolve the promise passed from Home
    usersPromise
      .then((data) => setReviews(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [usersPromise]);

  if (loading) return <Spinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {reviews.map((review) => (
        <div key={review._id} className="bg-white shadow rounded p-4">
          <img
            src={review.foodImage || review.photoUrl}
            alt={review.foodName}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="font-bold text-xl">{review.foodName}</h3>
          <p>{review.restaurantName}</p>
          <p>{review.location}</p>
          <p>Reviewed by: {review.userEmail || review.reviewerName}</p>
          <p>Rating: {review.rating} <FontAwesomeIcon icon={faStar} size="sm" className="text-yellow-500" /></p>
        </div>
      ))}
    </div>
  );
};

export default FeaturedReviews;
