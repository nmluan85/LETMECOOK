import DishCard from "./trending_card";

const TrendingDishes = () => {
    return (
        <div className="w-full mt-4 pb-20">
            <h1 className="text-4xl font-bold text-center text-blue-600">
                Trending dishes
            </h1>
            <p className="text-center text-gray-600 mt-2">
                Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!
            </p>

            <div className="ml-40 mr-40 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <DishCard 
                    dishName="Stuffed sticky rice ball"
                    cookTime="34 minutes"
                    author="Jennifer King"
                    description="Stuffed sticky rice balls: A delightful Asian treat with chewy, glutinous rice and a flavorful surprise filling..."
                />
                <DishCard 
                    dishName="Stuffed sticky rice ball"
                    cookTime="34 minutes"
                    author="Jennifer King"
                    description="Stuffed sticky rice balls: A delightful Asian treat with chewy, glutinous rice and a flavorful surprise filling..."
                />
                <DishCard 
                    dishName="Stuffed sticky rice ball"
                    cookTime="34 minutes"
                    author="Jennifer King"
                    description="Stuffed sticky rice balls: A delightful Asian treat with chewy, glutinous rice and a flavorful surprise filling..."
                />
                <DishCard 
                    dishName="Stuffed sticky rice ball"
                    cookTime="34 minutes"
                    author="Jennifer King"
                    description="Stuffed sticky rice balls: A delightful Asian treat with chewy, glutinous rice and a flavorful surprise filling..."
                />
            </div>
        </div>

    );
};

export default TrendingDishes;