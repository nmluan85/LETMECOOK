import React from "react";
import { FaRegClock, FaComment, FaHeart, FaRegBookmark, FaStar } from "react-icons/fa";

const DishCard = ({dishImg, dishName, cookTime, commentCnt, heartCnt}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
      <img alt="A slice of snack cake on a red plate with a spoon" className="rounded-t-lg w-full" height="200" src={dishImg} width="300"/>
      <div className="p-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold mb-2">
            {dishName}
          </h2>
          <FaRegBookmark />
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-2">
        <FaRegClock className="mr-1"/>
        <span>
          {cookTime}
        </span>
        </div>
        <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-gray-500 text-sm">
          <FaComment className="mr-1"/>
          <span>
            {commentCnt}
          </span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
          <FaHeart className="mr-1"/>
          <span>
            {heartCnt}
          </span>
          </div>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-400"/>
          <FaStar className="text-yellow-400"/>
          <FaStar className="text-yellow-400"/>
          <FaStar className="text-yellow-400"/>
          <FaStar className="text-gray-300"/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DishCard;

<html lang="en">
 <head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <title>
   Snack Cakes
  </title>
  <script src="https://cdn.tailwindcss.com">
  </script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
 </head>
 <body class="flex items-center justify-center min-h-screen bg-gray-100">
  
 </body>
</html>
