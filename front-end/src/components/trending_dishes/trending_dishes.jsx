import TrendingCard from "./trending_card";
import img1 from "../../assets/Strawberry-Shortcake-1.png"


const TrendingDishes = () => {
    return (
        <div className="w-full mt-4 pb-20">
            <h1 className="text-4xl font-bold text-center text-blue-600">
                Trending dishes
            </h1>
            <p className="text-center text-gray-600 mt-2">
                Curated Culinary Delights: Handpicked Favorites by Our Expert Editors!
            </p>

            <div className="ml-40 mr-40 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mx-4">
                <TrendingCard
                    _id="1001"
                    dishName="Strawberry Shortcake"
                    cookTime="45 minutes"
                    author="Emma Gonzalez"
                    description="It seems like there may be a misunderstanding. If you're asking how a user can make a Strawberry Shortcake, the process would be..."
                    img={img1}
                    authorAvatar="https://storage.googleapis.com/a1aa/image/LfeF62dMscvPXUwP7Wxy4tP0kj4t1fAVP6LnZtZTyuS0VuvnA.jpg"
                />
                <TrendingCard
                    _id="1001"
                    dishName="Strawberry Shortcake"
                    cookTime="45 minutes"
                    author="Emma Gonzalez"
                    description="It seems like there may be a misunderstanding. If you're asking how a user can make a Strawberry Shortcake, the process would be..."
                    img={img1}
                    authorAvatar="https://storage.googleapis.com/a1aa/image/LfeF62dMscvPXUwP7Wxy4tP0kj4t1fAVP6LnZtZTyuS0VuvnA.jpg"
                />
                <TrendingCard
                    _id="1001"
                    dishName="Strawberry Shortcake"
                    cookTime="45 minutes"
                    author="Emma Gonzalez"
                    description="It seems like there may be a misunderstanding. If you're asking how a user can make a Strawberry Shortcake, the process would be..."
                    img={img1}
                    authorAvatar="https://storage.googleapis.com/a1aa/image/LfeF62dMscvPXUwP7Wxy4tP0kj4t1fAVP6LnZtZTyuS0VuvnA.jpg"
                />
                <TrendingCard
                    _id="1001"
                    dishName="Strawberry Shortcake"
                    cookTime="45 minutes"
                    author="Emma Gonzalez"
                    description="It seems like there may be a misunderstanding. If you're asking how a user can make a Strawberry Shortcake, the process would be..."
                    img={img1}
                    authorAvatar="https://storage.googleapis.com/a1aa/image/LfeF62dMscvPXUwP7Wxy4tP0kj4t1fAVP6LnZtZTyuS0VuvnA.jpg"
                />
            </div>
        </div>

    );
};

export default TrendingDishes;