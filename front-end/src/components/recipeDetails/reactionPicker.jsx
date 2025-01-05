import React, { useState } from "react";
import { ReactionBarSelector } from "@charkour/react-reactions";

const ReactionButton = ({ onReaction }) => {
    const [selectedReaction, setSelectedReaction] = useState(null); // State for the selected reaction
    const [showPicker, setShowPicker] = useState(false); // State to control the visibility of ReactionPicker

    const reactions = [
        { label: "Like", node: <div>👍</div>, key: "like" },
        { label: "Love", node: <div>❤️</div>, key: "heart" },
        { label: "Haha", node: <div>😄</div>, key: "laugh" },
        { label: "Wow", node: <div>😮</div>, key: "wow" },
        { label: "Sad", node: <div>😢</div>, key: "sad" },
    ];

    const handleSelect = (key) => {
        const reaction = reactions.find((reaction) => reaction.key === key);
        setSelectedReaction(reaction);
        setShowPicker(false);
        if (onReaction) {
            onReaction(reaction); // Notify parent about the selected reaction
        }
    };

    return (
        <div className="relative">
            {/* Reaction Button */}
            <button
                className="flex items-center px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-md hover:bg-blue-100 focus:ring-2 focus:ring-blue-500"
                onMouseEnter={() => setShowPicker(true)}
                onMouseLeave={() => setShowPicker(false)}
            >
                {selectedReaction ? (
                    <>
                        {selectedReaction.node}{" "}
                        <span className="ml-2">{selectedReaction.label}</span>
                    </>
                ) : (
                    "Reaction"
                )}
            </button>

            {/* Reaction Picker */}
            {showPicker && (
                <div
                    className="absolute top-full mt-2 bg-white border rounded-md shadow-md"
                    onMouseEnter={() => setShowPicker(true)} // Keep it open while hovering
                    onMouseLeave={() => setShowPicker(false)} // Close when not hovering
                >
                    <ReactionBarSelector
                        reactions={reactions}
                        onSelect={handleSelect}
                        iconSize={40}
                        style={{ padding: "10px" }}
                    />
                </div>
            )}
        </div>
    );
};

export default ReactionButton;
