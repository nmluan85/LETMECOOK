import React, {useRef, useState} from 'react';
import Item from '../../components/item/item';
import Banner from '../../assets/icons/banner.png'
import TrendingDishes from '../../components/trending_dishes/trending_dishes'
const ITEM_WIDTH = 260;
const Home = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef();

    const handleScroll = (scrollAmount) => {
        const newSrollPosition = scrollAmount + scrollPosition;
        setScrollPosition(newSrollPosition);
        containerRef.current.scrollLeft = newSrollPosition;
    };
    return (
        <div>
            <main>
                <section className="relative">
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
                </section>
                <div className="containerScroll">
                    <div ref={containerRef}
                        style = {{
                            width: "1500px",
                            overflowX: "scroll",
                            scrollBehavior: "smooth",
                            scrollbarWidth: "none",
                        }}>
                        <div className='content-box'>
                            {Array(6).fill().map((_, i) => (
                                <Item/>
                            ))}
                        </div>
                    </div>
                    <div className='action-btns'>
                        <button onClick={() => {handleScroll(-ITEM_WIDTH)}}> Left</button>
                        <button onClick={() => {handleScroll(ITEM_WIDTH)}}> Right</button>
                    </div>
                </div>
                <section className="py-12 bg-white">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-blue-600 mb-4">This Summer Recipes</h2>
                        <p className="text-gray-700 mb-8">We have all your Independence Day sweets covered.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {Array(6).fill().map((_, i) => (
                                <Item/>
                            ))}
                        </div>
                    </div>
                </section>

                <TrendingDishes />
            </main>
        </div>
    );
}

export default Home;