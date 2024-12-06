import React, {useRef, useState} from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Item from '../../components/item/item';
import Banner from '../../assets/icons/banner.png'
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
            <Header/>
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

                <section className="py-12 bg-gray-100">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-blue-600 mb-4">Trending dishes</h2>
                        <p className="text-gray-700 mb-8">Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="bg-white p-4 rounded-lg shadow">
                                <img src="https://placehold.co/200x200" alt="Stuffed sticky rice ball" className="w-full h-40 object-cover rounded-lg mb-4"/>
                                <h3 className="text-lg font-bold mb-2">Stuffed sticky rice ball</h3>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <i className="far fa-clock"></i> 34 minutes
                                </div>
                                <div className="flex items-center mb-4">
                                    <img src="https://placehold.co/40x40" alt="Jennifer King" className="h-10 w-10 rounded-full mr-2"/>
                                    <span className="text-gray-700">Jennifer King</span>
                                </div>
                                <p className="text-gray-700 mb-4">Stuffed sticky rice balls: A delightful Asian treat with chewy, glutinous rice and a flavorful surprise filling...</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                    </div>
                                    <i className="far fa-bookmark"></i>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <img src="https://placehold.co/200x200" alt="Strawberry smoothie" className="w-full h-40 object-cover rounded-lg mb-4"/>
                                <h3 className="text-lg font-bold mb-2">Strawberry smoothie</h3>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <i className="far fa-clock"></i> 40 minutes
                                </div>
                                <div className="flex items-center mb-4">
                                    <img src="https://placehold.co/40x40" alt="Matthew Martinez" className="h-10 w-10 rounded-full mr-2"/>
                                    <span className="text-gray-700">Matthew Martinez</span>
                                </div>
                                <p className="text-gray-700 mb-4">Savor the refreshing delight of a strawberry smoothie. Made with ripe strawberries, this creamy blend offers...</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                    </div>
                                    <i className="far fa-bookmark"></i>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <img src="https://placehold.co/200x200" alt="Latte Art" className="w-full h-40 object-cover rounded-lg mb-4"/>
                                <h3 className="text-lg font-bold mb-2">Latte Art</h3>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <i className="far fa-clock"></i> 19 minutes
                                </div>
                                <div className="flex items-center mb-4">
                                    <img src="https://placehold.co/40x40" alt="Sarah Hill" className="h-10 w-10 rounded-full mr-2"/>
                                    <span className="text-gray-700">Sarah Hill</span>
                                </div>
                                <p className="text-gray-700 mb-4">Latte art is the skillful craft of creating captivating designs on the surface of a latte...</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                    </div>
                                    <i className="far fa-bookmark"></i>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow">
                                <img src="https://placehold.co/200x200" alt="Butter fried noodles" className="w-full h-40 object-cover rounded-lg mb-4"/>
                                <h3 className="text-lg font-bold mb-2">Butter fried noodles</h3>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <i className="far fa-clock"></i> 16 minutes
                                </div>
                                <div className="flex items-center mb-4">
                                    <img src="https://placehold.co/40x40" alt="Julia Lopez" className="h-10 w-10 rounded-full mr-2"/>
                                    <span className="text-gray-700">Julia Lopez</span>
                                </div>
                                <p className="text-gray-700 mb-4">Butter fried noodles: Savory noodles cooked in butter for a delicious and satisfying meal...</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                        <i className="fas fa-star text-yellow-500"></i>
                                    </div>
                                    <i className="far fa-bookmark"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default Home;