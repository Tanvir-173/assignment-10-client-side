import React from "react";

const WhyLoveUs = () => {
  return (
    <section className="py-12 bg-orange-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Local Food Lovers Love Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-semibold mb-2">Discover Hidden Gems</h3>
            <p>
              Explore local restaurants and street food places recommended by real people from your community.
            </p>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-semibold mb-2">Honest Reviews</h3>
            <p>
              Read genuine experiences shared by food lovers who care about taste, quality, and culture.
            </p>
          </div>

          <div className="bg-white p-6 shadow rounded">
            <h3 className="text-xl font-semibold mb-2">Share Your Story</h3>
            <p>
              Post your food journey, upload photos, and inspire others to try something new today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLoveUs;
