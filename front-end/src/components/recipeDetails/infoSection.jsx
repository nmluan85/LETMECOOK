import ReactionButton from "./ReactionPicker";
import SaveButton from "../recipeCard/saveButton";
import { FaStar } from "react-icons/fa";

const RecipeDetailsInfoSection = ({recipeInfo}) => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">
                How to make a {recipeInfo.item.title}
            </h1>
            <p className="text-gray-700 mb-4">
                {recipeInfo.introduction}
            </p>
            <div className="flex items-center mb-6">
                <ReactionButton/>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                <img 
                    alt={`Profile picture of ${recipeInfo.item.author?.username || 'user'}`} 
                    className="w-12 h-12 rounded-full mr-4" 
                    height="50" 
                    src={recipeInfo.item.author?.avatar} 
                    width="50"
                />
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">
                        {recipeInfo.item.author?.username || 'Anonymous'}
                    </h2>
                </div>
                <SaveButton 
                    recipeId={recipeInfo.item._id} 
                    isClicked={recipeInfo.isSaved}
                    onClick={() => {}}/>
            </div>
            <div className="flex justify-between items-center mt-5">
                <div className="mr-6 flex flex-col items-center">
                    <p className="text-gray-500 text-sm">
                        Time:
                    </p>
                    <p className="text-lg font-semibold">
                        {recipeInfo.item.duration} minutes
                    </p>
                </div>
                <div className="mr-6 flex flex-col items-center">
                    <p className="text-gray-500 text-sm">
                        Comment
                    </p>
                    <p className="text-lg font-semibold">
                        {recipeInfo.item.comments ? Object.keys(recipeInfo.item.comments).length : 0} comments
                    </p>
                </div>
                <div className="mr-6 flex flex-col items-center">
                    <p className="text-gray-500 text-sm">
                        Rating:
                    </p>
                    <div className="flex items-center">
                        <FaStar className="text-yellow-500 cursor-pointer"/>
                        <FaStar className="text-yellow-500 cursor-pointer"/>
                        <FaStar className="text-yellow-500 cursor-pointer"/>
                        <FaStar className="text-yellow-500 cursor-pointer"/>
                        <FaStar className="text-gray-400 cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsInfoSection;