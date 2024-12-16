import React from 'react';
import { useState } from 'react';
import SeasonRecipe from '../../components/home/seasonRecipe/seasonRecipe';
import Banner from '../../components/home/banner/banner';
import TrendingDishes from '../../components/trending_dishes/trending_dishes';

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
        </div>
    );
}
export default Home;