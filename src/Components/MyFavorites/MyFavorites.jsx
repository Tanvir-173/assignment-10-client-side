// src/Components/MyFavorites/MyFavorites.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Spinner from "../../Spinner/Spinner";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorite reviews of the logged-in user
  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      try {
        const res = await fetch(`http://localhost:5000/favorites?email=${user.email}`);
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  // Remove favorite
  const handleRemove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/favorites/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success("Removed from Favorites");
        setFavorites(favorites.filter(fav => fav._id !== id));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove favorite");
    }
  };

  if (!user) return <p className="text-center py-10 text-gray-500">Please login to see your favorites.</p>;
  if (loading) return <Spinner />;
  if (favorites.length === 0) return <p className="text-center py-10 text-gray-500">No favorites yet.</p>;

  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((fav) => (
          <div key={fav._id} className="bg-white shadow rounded p-4 flex flex-col relative">
            {/* Remove Button */}
            <button
              onClick={() => handleRemove(fav._id)}
              className="absolute top-3 right-3 text-xl text-gray-400 hover:text-red-500"
              title="Remove from Favorites"
            >
               <FontAwesomeIcon icon={faTrash} size="lg" className="text-red-500" />
            </button>

            <img src={fav.foodImage} alt={fav.foodName} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold">{fav.foodName}</h3>
            <p className="text-gray-500">{fav.restaurantName}</p>
            <p className="text-gray-500 mb-2">{fav.location}</p>
            <p className="mb-2">Rating: {fav.rating} <FontAwesomeIcon icon={faStar} size="sm" className="text-yellow-500" /></p>
            <p className="text-sm text-gray-400">
              Added on {new Date(fav.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyFavorites;
