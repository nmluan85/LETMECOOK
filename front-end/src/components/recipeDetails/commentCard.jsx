import React from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const CommentCard = ({user, comment, rating, createdAt }) => {
  return (
    <div className="bg-white p-4 shadow-md flex items-start space-x-4 mb-5">
      <div className="relative">
        <img
          alt="Profile picture of a person wearing a hat"
          className="w-12 h-12 rounded-full"
          height="50"
          src={user.avatar}
          width="50"
        />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold">{user.username}</h4>
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
        <div className="flex items-center space-x-2 mt-2 text-gray-500">
          <div className="flex items-center space-x-2">
            <FaThumbsUp />
            <span>0</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaThumbsDown />
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;