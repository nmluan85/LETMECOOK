import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const CheckPost = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/posts/all",
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        // Filter posts by author ID
        const userPosts = data.filter(post => post.author._id === userId);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link to="/admin-hub" className="text-blue-500 hover:underline">
          ← Back to Admin Hub
        </Link>
      </div>
      
      <h1 className="text-2xl font-bold mb-6">User Posts</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md p-4">
            {post.photo && (
              <img
                src={post.photo}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <span className="text-sm text-red-500">
                    Reports: {post.reports?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <p className="text-center text-gray-500">No posts found for this user.</p>
      )}
    </div>
  );
};

export default CheckPost;