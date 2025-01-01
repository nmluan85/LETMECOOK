import { FaStar } from "react-icons/fa";
import { useState } from "react";
import CommentCard from "./commentCard";
import moment from "moment";
import { useAuth } from "../../contexts/AuthContext";

const CommentSection = () => {
  const [comment, setComment] = useState(""); // State for comment text
  const [rating, setRating] = useState(4); // State for rating (default 4)
  const [allComments, setAllComments] = useState([]); // State for all comments
  const { isLoggedIn, user, login, logout} = useAuth();

  const handleCommentChange = (e) => {
    setComment(e.target.value); // Update comment state
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating); // Update rating state
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      // Create new comment object
      const newComment = {
        user: user,
        content: comment,
        rating: rating,
        createdAt: new Date(),
      };
      // Add new comment to the list
      setAllComments((prevComments) => [...prevComments, newComment]);
      // Reset input fields
      setComment("");
      setRating(4);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Comment</h2>
      <div className="border rounded-lg p-4">
        <textarea
          className="w-full h-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="State your opinion about the article"
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span className="mr-2 font-bold">Rating</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`${
                          star <= rating ? "text-yellow-500" : "text-gray-300"
                      } cursor-pointer`}
                      onClick={() => handleRatingChange(star)}
                    />
                ))}
              </div>
          </div>
          <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:shadow-lg transition duration-300"
              onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
        
      {/* List of comments with ScrollToBottom */}
      <div className="mt-8">
        {allComments.map((c) => (
          <CommentCard
            user={c.user}
            key={c.createdAt} 
            comment={c.content} 
            rating={c.rating} 
            createdAt={moment(c.createdAt).fromNow()} 
          />
        ))}
      </div>
    </div>
  );
};  

export default CommentSection;