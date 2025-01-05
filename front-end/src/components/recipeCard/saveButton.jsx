import React, { useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { useLoginModal } from "../../contexts/LoginModalContext";
import { useAuth } from "../../contexts/AuthContext";

const SaveButton = ({ recipeId, isClicked, onClick }) => {
    const { isLoggedIn } = useAuth();
    const [currentState, setIsClicked] = useState(isClicked);
    const { openLoginModal } = useLoginModal();
    const handleSaveRecipe = async () => {
        if (!isLoggedIn) {
            openLoginModal(true);
            return;
        }
        try {
            const method = currentState ? "DELETE" : "POST";
            const response = await fetch(
                `http://localhost:3000/api/users/save-post`,
                {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ postId: recipeId }), // Send the recipe/post ID
                    credentials: "include",
                },
            );

            if (response.ok) {
                // Check if status code is in the 200-299 range
                setIsClicked(!currentState); // Toggle the state
                onClick(); // Trigger optional callback
            } else {
                console.error(
                    "Failed to save or remove post:",
                    response.status,
                );
            }
        } catch (error) {
            console.error("Error saving recipe:", error.message);
        }
    };
    return (
        <div
            className={`w-8 h-8 border-2 rounded-full ml-auto mr-4 flex items-center justify-center ${currentState ? "bg-primary-default border-white" : "border-primary-default hover:border-primary-600"} group`}
            onClick={handleSaveRecipe}
        >
            <FaRegBookmark
                className={`w-4 h-4 transition-colors duration-300 ${currentState ? "text-white" : "text-primary-default hover:text-primary-600"} cursor-pointer`}
            />
        </div>
    );
};

export default SaveButton;
