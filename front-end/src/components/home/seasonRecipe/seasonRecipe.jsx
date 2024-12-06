import React  from 'react';
import Slider from 'react-slick';
import RecipeCard from '../../recipeCard/recipeCard';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

const SeasonRecipe = () => {
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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
                    slidesToScroll: 1,
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
    const recipes = Array(6).fill({
        id: 1,
        name: "Recipe Name",
        image: "path-to-image",
    });
    return (
        <div className="w-full pb-16">
            <h1 className="text-4xl font-bold text-center text-blue-600">
                This Summer Recipes
            </h1>
            <p className="text-center text-gray-600 mt-2">
                We have all your Independence Day sweets covered.
            </p>
            <Slider {...settings} className="ml-10 mr-10 mt-8 px-20">
                {recipes.map((item, index) => (
                    <div className="px-2" key={index}>
                        <RecipeCard item={item} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default SeasonRecipe