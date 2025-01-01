import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import SaveButton from "../recipeCard/saveButton";
import Rating from "../layout/rating";
import {useState} from 'react';

const TrendingCard = ({recipe, isSaved}) => {
    const idString = (_id) => {
        return String(_id).toLowerCase().split(" ").join("");
    };
    const rootId = idString(recipe._id);

    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(isSaved);
    const [isSaveHovered, setIsSaveHovered] = useState(false);  // Track hover state
    // Handle recipe details navigation
    const handleRecipeDetails = () => {
        if(!isSaveHovered) {
            navigate(`/recipe/${rootId}`, {
                state: {
                    item: recipe,
                    isSaved: isClicked,
                },
            });
        }
    };

    const handleSaveRecipe = () => {
        setIsClicked(!isClicked);
    };

    const handleMouseEnter = () => {
        setIsSaveHovered(true); // Set hover state to true when mouse enters
    };

    const handleMouseLeave = () => {
        setIsSaveHovered(false); // Set hover state to false when mouse leaves
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
            <img alt="Stuffed sticky rice ball on a plate" className="w-1/3 object-cover" height="150" src={recipe.photo} width="150"/>

            <div className="p-4 w-2/3">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-semibold">
                            {recipe.title}
                        </h2>
                        <p className="text-gray-500 text-sm">
                            {recipe.duration} minutes
                        </p>
                    </div>
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <SaveButton 
                            recipeId={rootId} 
                            isClicked={isSaved} 
                            onClick={handleSaveRecipe}/>
                    </div>
                </div>
                <div className="flex items-center mt-2">
                    <img alt="Jennifer King" className="w-8 h-8 rounded-full" height="30" src={recipe.author.avatar} width="30"/>
                    <p className="ml-2 text-gray-700">
                        {recipe.author.username}
                    </p>
                </div>
                <p class="text-gray-600 mt-2">
                    {recipe.content.split(' ').slice(0, 10).join(' ')}{recipe.content.split(' ').length > 10 ? '...' : ''}
                </p>
                <Rating/>
            </div>
        </motion.div>
    );
};

export default TrendingCard;