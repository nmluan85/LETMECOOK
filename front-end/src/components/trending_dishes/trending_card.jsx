import { FaBookmark, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import SaveButton from "../recipeCard/saveButton";
import Rating from "../layout/rating";

const TrendingCard = ({_id, dishName, cookTime, author, description, img, authorAvatar}) => {
    const idString = (_id) => {
        return String(_id).toLowerCase().split(" ").join("");
      };
    const rootId = idString(_id);

    const navigate = useNavigate();
    const handleRecipeDetails = () => {
        navigate(`/recipe/${rootId}`, {
            state: {
                item: {dishName, cookTime, author, description, img, authorAvatar},
            },
        });
    };
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            className="flex bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out"
            onClick={handleRecipeDetails}
        >
            <img alt="Stuffed sticky rice ball on a plate" className="w-1/3 object-cover" height="150" src={img} width="150"/>

            <div className="p-4 w-2/3">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-semibold">
                            {dishName}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {cookTime}
                        </p>
                    </div>
                    <SaveButton/>
                </div>
                <div className="flex items-center mt-2">
                    <img alt="Jennifer King" className="w-8 h-8 rounded-full" height="30" src={authorAvatar} width="30"/>
                    <p className="ml-2 text-gray-700">
                        {author}
                    </p>
                </div>
                <p class="text-gray-600 mt-2">
                    {description}
                </p>
                <Rating/>
            </div>
        </motion.div>
    );
};

export default TrendingCard;