import React from "react";
import Slider from "react-slick";
import DishCard from "./DishCard";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { snackCakes } from "../../../assets/images";

const SeasonDishes = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
            },
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
            },
          },
        ],
    };
    return (
        <div className="w-full mt-4 pb-20">
            <h1 className="text-4xl font-bold text-center text-blue-600">
                This Season Dishes
            </h1>
            <p className="text-center text-gray-600 mt-2">
                We have all your Holiday Day sweets covered.
            </p>
            <Slider {...settings}>
                <div className="px-2">
                    <DishCard
                        dishImg={snackCakes}
                        dishName="Snack cakes"
                        cookTime="21 minutes"
                        commentCnt="23"
                        heartCnt="23"
                    />
                </div>
                <div className="px-2">
                    <DishCard
                        dishImg={snackCakes}
                        dishName="Snack cakes"
                        cookTime="21 minutes"
                        commentCnt="23"
                        heartCnt="23"
                    />
                </div>
                <div className="px-2">
                    <DishCard
                        dishImg={snackCakes}
                        dishName="Snack cakes"
                        cookTime="21 minutes"
                        commentCnt="23"
                        heartCnt="23"
                    />
                </div>
                <div className="px-2">
                    <DishCard
                        dishImg={snackCakes}
                        dishName="Snack cakes"
                        cookTime="21 minutes"
                        commentCnt="23"
                        heartCnt="23"
                    />
                </div>
                <div className="px-2">
                    <DishCard
                        dishImg={snackCakes}
                        dishName="Snack cakes"
                        cookTime="21 minutes"
                        commentCnt="23"
                        heartCnt="23"
                    />
                </div>
            </Slider>
        </div>
    );
};

export default SeasonDishes;