import React from "react";

const cities = [
  { name: "Dhaka", image: "/images/cities/dhaka.jpg" },
  { name: "Chittagong", image: "/images/cities/ctg.jpg" },
  { name: "Sylhet", image: "/images/cities/sylhet.jpg" },
  { name: "Rajshahi", image: "/images/cities/rajshahi.jpg" },
];

const PopularCities = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Popular Food Destinations</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {cities.map((city, index) => (
            <div key={index} className="shadow rounded overflow-hidden hover:scale-105 transition">
              <img src={city.image} alt={city.name} className="w-full h-40 object-cover" />
              <div className="p-3 text-lg font-medium">{city.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCities;
