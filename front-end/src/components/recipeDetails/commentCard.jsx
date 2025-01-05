import React, { useState } from "react";
import ReactionButton from "./reactionPicker";
import { FaStar } from "react-icons/fa";
import { ReactionCounter } from "@charkour/react-reactions";

const CommentCard = ({ user, comment, rating, createdAt }) => {
    // Mock reactions state
    const [reactions, setReactions] = useState([]);

    const handleReaction = (reaction) => {
        const { label, node } = reaction;

        // Add the new reaction to the state
        setReactions((prevReactions) => [
            ...prevReactions,
            { label, node, by: "You" }, // Add current user reaction as "You"
        ]);
    };

    return (
        <div className="bg-white p-4 shadow-md flex items-start space-x-4 mb-5">
            <div className="relative">
                <img
                    alt="User avatar"
                    className="w-12 h-12 rounded-full"
                    src={
                        user?.avatar ||
                        "https://storage.googleapis.com/a1aa/image/LfeF62dMscvPXUwP7Wxy4tP0kj4t1fAVP6LnZtZTyuS0VuvnA.jpg?fbclid=IwY2xjawHFTmBleHRuA2FlbQIxMAABHa5SDm64IKSbbEmqhAG-PemXSUcbNxvVx7AD_9Qshz4XP73gSFfKmOfXXA_aem_Rz9cJD1d5qoi6ZqV5P28LA"
                    }
                />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <h4 className="font-semibold mr-1">
                            {user?.username || "Anonymous"}
                        </h4>
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={
                                        star <= rating
                                            ? "text-yellow-500"
                                            : "text-gray-300"
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <span className="text-gray-500 text-sm">{createdAt}</span>
                </div>
                <p className="text-gray-700 mt-1">{comment}</p>
                <div className="flex items-center space-x-4 mt-2">
                    <ReactionButton onReaction={handleReaction} />
                    {/* Reaction Counter */}
                    <ReactionCounter
                        reactions={reactions} // Pass the reactions array
                        iconSize={24}
                        showTotalOnly={false}
                        showOthersAlways={false}
                        bg="#fff"
                    />
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
