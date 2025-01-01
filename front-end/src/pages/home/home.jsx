import React from 'react';
import { useState } from 'react';
import SeasonRecipe from '../../components/home/seasonRecipe/seasonRecipe';
import Banner from '../../components/home/banner/banner';
import TrendingDishes from '../../components/trending_dishes/trending_dishes';
import Chatbot from '../../components/home/chatbot/ChatBot';

const Home = () => {
    return (
        <div>
            <main>
                <div className='pd-10 flex flex-col gap-10'>
                    <Banner />
                    <SeasonRecipe/>
                    <TrendingDishes />
                </div>
            </main>
            {/* Chatbot Component */}
            <Chatbot />
        </div>
    );
}
export default Home;