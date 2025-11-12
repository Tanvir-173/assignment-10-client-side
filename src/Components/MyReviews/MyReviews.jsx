// src/Components/Reviews/MyReviews.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Spinner from "../../Spinner/Spinner";

const MyReviews = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [deleteId, setDeleteId] = useState(null); // ID of review to delete
  const [showModal, setShowModal] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
    //   toast.error("You must be logged in to view your reviews!");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Fetch user reviews
  useEffect(() => {
    if (!user) return;
    const fetchReviews = async () => {
      try {
        const res = await fetch(`https://assignment10-server-ruby-beta.vercel.app/reviews?userEmail=${user.email}`);
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your reviews!");
      } finally {
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [user]);

  // Delete review
  const handleDelete = async (id) => {
  try {
    const res = await fetch(`https://assignment10-server-ruby-beta.vercel.app/reviews/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    // Check response message instead
    if (res.ok) {
      toast.success(data.message || "Review deleted successfully!");
      setReviews(reviews.filter((r) => r._id !== id));
    } else {
      toast.error(data.message || "Failed to delete review!");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete review!");
  }
  setShowModal(false);
};

  // Show spinner while loading
  if (loading || loadingReviews) return <Spinner />;

  
  return (
  <div className="max-w-6xl mx-auto my-10 px-4">
    <h2 className="text-3xl font-bold mb-6">My Reviews</h2>

    {reviews.length === 0 ? (
      <p className="text-center text-gray-500">
        You haven't added any reviews yet.
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Food Image</th>
              <th className="border px-4 py-2">Food Name</th>
              <th className="border px-4 py-2">Restaurant Name</th>
              <th className="border px-4 py-2">Posted Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="text-center">
                <td className="border px-4 py-2">
                  <img
                    src={review.foodImage}
                    alt={review.foodName}
                    className="w-20 h-20 object-cover mx-auto"
                  />
                </td>
                <td className="border px-4 py-2">{review.foodName}</td>
                <td className="border px-4 py-2">{review.restaurantName}</td>
                <td className="border px-4 py-2">
                  {new Date(review.date).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/edit-review/${review._id}`)}
                      className="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(review._id);
                        setShowModal(true);
                      }}
                      className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {/* Delete confirmation modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-11/12 sm:w-96 text-center">
          <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
          <p className="mb-6">Are you sure you want to delete this review?</p>
          <div className="flex flex-col sm:flex-row justify-around gap-4">
            <button
              onClick={() => handleDelete(deleteId)}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default MyReviews;
