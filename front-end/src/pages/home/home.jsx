import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Item from '../../components/item/item';
import Banner from '../../assets/icons/banner.png'
import TrendingDishes from '../../components/trending_dishes/trending_dishes';
const Home = () => {
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

                <section className="py-12 bg-white">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-blue-600 mb-4">This Summer Recipes</h2>
                        <p className="text-gray-700 mb-8">We have all your Independence Day sweets covered.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {Array(4).fill().map((_, i) => (
                                <Item/>
                            ))}
                        </div>
                    </div>
                </section>

                <TrendingDishes />
            </main>
            <Footer/>
        </div>
    );
}

export default Home;