import React, { useState } from 'react';
import { ReactionBarSelector } from '@charkour/react-reactions';

const ReactionButton = () => {
  const [selectedReaction, setSelectedReaction] = useState(null); // State for the selected reaction
  const [showPicker, setShowPicker] = useState(false); // State to control the visibility of ReactionPicker

  const reactions = [
    { label: 'Like', node: <div>👍</div>, key: 'like' },
    { label: 'Love', node: <div>❤️</div>, key: 'love' },
    { label: 'Haha', node: <div>😄</div>, key: 'haha' },
    { label: 'Wow', node: <div>😮</div>, key: 'wow' },
    { label: 'Sad', node: <div>😢</div>, key: 'sad' },
    { label: 'Angry', node: <div>😡</div>, key: 'angry' },
  ];

  const handleSelect = (key) => {
    const reaction = reactions.find((reaction) => reaction.key === key);
    setSelectedReaction(reaction); // Set the selected reaction
    setShowPicker(false); // Hide the picker after selection
  };

  return (
    <div className="relative">
      {/* Reaction Button */}
      <button
        className="flex items-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        onMouseEnter={() => setShowPicker(true)}
        onMouseLeave={() => setShowPicker(false)}
      >
        {selectedReaction ? (
          <>
            {selectedReaction.node} <span className="ml-2">{selectedReaction.label}</span>
          </>
        ) : (
          'Reaction'
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
            style={{ padding: '10px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ReactionButton;