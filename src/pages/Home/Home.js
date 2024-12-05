import React from "react";
import Banner from "../../components/Banner/Banner";
import SeasonDishes from "../../components/home/SeasonDishes/SeasonDishes";
import TrendingDishes from "../../components/home/TrendingDishes/TrendingDishes";

const Home = () => {
  return (
    <div className="w-full mx-auto">
      <Banner />
      <div className="max-w-container mx-auto px-4">
        <SeasonDishes />
        <TrendingDishes />
      </div>
    </div>
  );
};

export default Home;
