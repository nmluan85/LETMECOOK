import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../login/loginModal';

import SaveButton from './saveButton';
import Rating from '../layout/rating';
import ClockIcon from '../../assets/icons/clock.png';
import CommentIcon from '../../assets/icons/comment.png';
import HeartIcon from '../../assets/icons/heart.png';
const RecipeCard = ({recipe, openLoginModal}) => {
    const idString = (_id) => {
        return String(_id).toLowerCase().split(" ").join("");
    };
    const rootId = idString(recipe._id);
    const {isLoggedIn} = useAuth();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);

    const [isClicked, setIsClicked] = useState(false);
    const [isSaveHovered, setIsSaveHovered] = useState(false);  // Track hover state

    const handleSaveRecipe = () => {
        if (!isLoggedIn) {
            console.log("Not logged in");
            openLoginModal();
        }
        setIsClicked(!isClicked);
    };

    const navigate = useNavigate();
    // Handle recipe details navigation
    const handleRecipeDetails = () => {
        if(!isSaveHovered) {
            navigate(`/recipe/${rootId}`, {
                state: {
                    item: recipe,
                },
            });
        }
    };
    const handleMouseEnter = () => {
        setIsSaveHovered(true); // Set hover state to true when mouse enters
    };

    const handleMouseLeave = () => {
        setIsSaveHovered(false); // Set hover state to false when mouse leaves
    };
    const handleLoginSuccess = () => {
        login();
        setLoginModalOpen(false);
    }
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            className="flex bg-white w-[260px] shadow-lg rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out"
            onClick={handleRecipeDetails}
        >
            <div className="bg-white rounded-lg shadow w-[260px]">
                <img src={recipe.photo} alt="Recipe Image" className="w-full h-40 object-cover rounded-tl-lg rounded-tr-lg mb-2"/>
                <div className="text-left font-medium mb-2 pl-2">
                    <h3 className="truncate-multiline">
                        {recipe.title}
                    </h3>
                </div>
                <div className="flex flex-col justify-between text-gray-600 mb-2 pl-2">
                    <span className="flex items-center">
                        <img src={ClockIcon} alt="Clock Icon" className="h-4 w-4 mr-2"></img> 
                        <div className="bg-primary-100 rounded-full px-2 py-1 text-xs primary-color font-medium">
                            {recipe.duration} minutes
                        </div>
                        <div className='ml-auto' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> 
                            <SaveButton 
                                isClicked={false} 
                                onClick={handleSaveRecipe}
                            />
                        </div>
                        
                    </span>
                    <span className="flex items-center mb-2">
                        <div className="flex justify-between text-gray-600 mb-2 w-full">
                            <div className="flex items-center pr-2">
                            <img src={CommentIcon} alt="Comment Icon" className="h-4 w-4 mr-2" />
                            <div className="bg-primary-100 rounded-full px-3 py-1 text-xs primary-color font-medium">
                                {recipe.comments.length}
                            </div>
                            </div>
                            <div className="flex items-center pr-2">
                            <img src={HeartIcon} alt="Heart Icon" className="h-4 w-4 mr-2" />
                            <div className="bg-primary-100 rounded-full px-3 py-1 text-xs primary-color font-medium">
                                21
                            </div>
                            </div>
                            <div className="ml-auto flex items-center mr-4">
                            <Rating />
                            </div>
                        </div>
                    </span>
                </div>
            </div>
       {isLoginModalOpen && (
            <LoginModal 
                onClose={() => setLoginModalOpen(false)}
                onLoginSuccess = {handleLoginSuccess}

            />
        )} 
        </motion.div>
    )
}
export default RecipeCard