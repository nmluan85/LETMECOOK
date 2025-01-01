import React, { useState } from 'react';
import ReactionButton from './reactionPicker';
import { FaStar } from 'react-icons/fa';

const CommentCard = ({ user, comment, rating, createdAt }) => {
  const [reactionCount, setReactionCount] = useState(0);
  const [hasReacted, setHasReacted] = useState(false); // Track whether the user has already reacted

  const handleReaction = (reaction) => {
    // If the user hasn't reacted yet, increment the reaction count
    if (!hasReacted) {
      setReactionCount((prevCount) => prevCount + 1);
      setHasReacted(true);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md flex items-start space-x-4 mb-5">
      <div className="relative">
        <img
          alt="User avatar"
          className="w-12 h-12 rounded-full"
          src={user.avatar}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold mr-1">{user.username}</h4>
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
                  />
                ))}
            </div>
          </div>
          <span className="text-gray-500 text-sm">{createdAt}</span>
        </div>
        <p className="text-gray-700 mt-1">{comment}</p>
        <div className="flex items-center space-x-4 mt-2">
          <ReactionButton onReaction={handleReaction} />
          <div className="text-gray-700">({reactionCount})</div> {/* Display total reactions */}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;