import React, {useState} from 'react';
import { FaRegBookmark } from "react-icons/fa6";

const SaveButton = ({isClicked}) => {
    const [currentState, setIsClicked] = useState(isClicked);
    const handleSaveRecipe = () => {
        setIsClicked(!currentState);
    }
    return (
        <div class={`w-8 h-8 border-2 rounded-full bg-transparent ml-auto mr-4 flex items-center justify-center ${currentState ? 'bg-primary-default border-white' : 'border-primary-default hover:border-primary-600'} group`}>
            <FaRegBookmark 
                onClick={handleSaveRecipe} 
                className={`w-4 h-4 transition-colors duration-300 ${currentState ? 'text-white': 'text-primary-default hover:text-primary-600'} cursor-pointer`}/>
        </div>
    );
}

export default SaveButton;