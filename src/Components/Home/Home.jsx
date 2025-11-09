import React from "react";
import { Link } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FeaturedReviews from "../FeaturedReviews/FeaturedReviews";
import WhyLoveUs from "../WhyLoveUs/WhyLoveUs";
import PopularCities from "../PopularCities/PopularCities";

const usersPromise=fetch('http://localhost:5000/pruducts').then(res=>res.json())

const Home = () => {
    const banners = [
        {
            image: "/images/hero1.jpg",
            title: "Explore Local Flavors",
            subtitle: "Discover the best dishes near you",
            buttonText: "View Reviews",
            buttonLink: "/reviews",
        },
        {
            image: "/images/hero2.jpg",
            title: "Share Your Food Experience",
            subtitle: "Post reviews and photos of your favorite meals",
            buttonText: "Add Review",
            buttonLink: "/add-review",
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <div>
            <section className="relative">
                <Slider {...settings}>
                    {banners.map((banner, index) => (
                        <div key={index} className="relative">
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="w-full h-[400px] object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
                                <h1 className="text-3xl md:text-5xl font-bold mb-2">{banner.title}</h1>
                                <p className="mb-4">{banner.subtitle}</p>
                                <Link
                                    to={banner.buttonLink}
                                    className="px-6 py-2 bg-orange-500 rounded hover:bg-orange-600"
                                >
                                    {banner.buttonText}
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>
            <FeaturedReviews usersPromise={usersPromise}></FeaturedReviews>
            <WhyLoveUs></WhyLoveUs>
            <PopularCities></PopularCities>
        </div>

    );
};

export default Home;
