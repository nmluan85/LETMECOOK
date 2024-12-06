import React, {useState} from 'react';
import { motion } from 'framer-motion';

import SaveButton from './saveButton';
import Rating from '../layout/rating';
import Picture from '../../assets/icons/picture.png';
import ClockIcon from '../../assets/icons/clock.png';
import CommentIcon from '../../assets/icons/comment.png';
import HeartIcon from '../../assets/icons/heart.png';
import { FaRegBookmark } from "react-icons/fa6";
const RecipeCard = ({ item }) => {
    const [isClicked, setIsClicked] = useState(false);
    const handleSaveRecipe = () => {
        setIsClicked(!isClicked);
    }
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            className="flex bg-white w-[260px] shadow-lg rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out"
        >
            <div className="bg-white rounded-lg shadow w-[260px]">
                <img src={Picture} alt="Recipe Image" className="w-full h-40 object-cover rounded-tl-lg rounded-tr-lg mb-2"/>
                <div className="text-left font-medium mb-2 pl-2">
                    <h3 className="truncate-multiline">
                        This is a long text that will be truncated after two lines. The text will show the first two lines, and the rest will be hidden with an ellipsis at the end. Even if the content exceeds, it won't show more than two lines of text.
                    </h3>
                </div>
                <div className="flex flex-col justify-between text-gray-600 mb-2 pl-2">
                    <span className="flex items-center">
                        <img src={ClockIcon} alt="Clock Icon" className="h-4 w-4 mr-2"></img> 
                        <div className="bg-primary-150 rounded-full px-2 py-1 text-xs primary-color font-medium">
                            21 minutes
                        </div>
                        <SaveButton isClicked={false}/>
                        
                    </span>
                    <span className="flex items-center mb-2">
                        <div className="flex justify-between text-gray-600 mb-2 w-full">
                            <div className="flex items-center pr-2">
                            <img src={CommentIcon} alt="Comment Icon" className="h-4 w-4 mr-2" />
                            <div className="bg-primary-150 rounded-full px-3 py-1 text-xs primary-color font-medium">
                                32
                            </div>
                            </div>
                            <div className="flex items-center pr-2">
                            <img src={HeartIcon} alt="Heart Icon" className="h-4 w-4 mr-2" />
                            <div className="bg-primary-150 rounded-full px-3 py-1 text-xs primary-color font-medium">
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
        </motion.div>
    )
}
export default RecipeCard