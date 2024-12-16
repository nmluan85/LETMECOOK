import React, {useState} from 'react';
import { FaRegBookmark } from "react-icons/fa6";
import { useLoginModal } from '../../contexts/LoginModalContext';
import { useAuth } from '../../contexts/AuthContext';

const SaveButton = ({isClicked, onClick}) => {
    const {isLoggedIn} = useAuth();
    const [currentState, setIsClicked] = useState(isClicked);
    const {openLoginModal} = useLoginModal();
    const handleSaveRecipe = () => {
        if (!isLoggedIn) {
            openLoginModal(true);
        }
        else {
            setIsClicked(!currentState);
            onClick();
        }
    }
    return (
        <div 
            className={`w-8 h-8 border-2 rounded-full ml-auto mr-4 flex items-center justify-center ${currentState ? 'bg-primary-default border-white' : 'border-primary-default hover:border-primary-600'} group`}
            onClick={handleSaveRecipe} 
        >
            <FaRegBookmark 
                className={`w-4 h-4 transition-colors duration-300 ${currentState ? 'text-white': 'text-primary-default hover:text-primary-600'} cursor-pointer`}/>
        </div>
    );
}

export default SaveButton;