import React, {useRef, useState} from 'react';
import Slider from 'react-slick';
import Header from '../../components/home/header/header';
import SeasonRecipe from '../../components/home/seasonRecipe/seasonRecipe';
import Banner from '../../components/home/banner/banner';
import Footer from '../../components/home/footer/footer';
import Item from '../../components/recipeCard/recipeCard';
import TrendingDishes from '../../components/trending_dishes/trending_dishes';
import NextArrow from '../../components/home/seasonRecipe/NextArrow';
const Home = () => {
    return (
        <div>
            <main>
                {/* <section className="relative pd-10">
                    <img src={Banner} alt="Cooking background" className="w-full h-96 object-cover"/>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                            <h2 className="text-green-600 font-bold mb-2">Recipe of the day</h2>
                            <h3 className="text-2xl font-bold mb-4">Salad Caprese</h3>
                            <p className="text-gray-700 mb-4">Classic Italian Salad Caprese: ripe tomatoes, fresh mozzarella, herbs, olive oil, and balsamic vinegar create a refreshing dish for lunch or appetizer.</p>
                            <div className="flex items-center justify-center mb-4">
                                <img src="https://placehold.co/40x40" alt="Salad Caprese" className="h-10 w-10 rounded-full mr-2"/>
                                <span className="text-gray-700">Salad Caprese</span>
                            </div>
                            <button className="bg-blue-600 text-white py-2 px-4 rounded-full">View now</button>
                        </div>
                    </div>
                </section> */}
                <div className='pd-10 flex flex-col gap-10'>
                    <Banner />
                    <SeasonRecipe />
                    <TrendingDishes />
                </div>
            </main>
        </div>
    );
}

export default Home;