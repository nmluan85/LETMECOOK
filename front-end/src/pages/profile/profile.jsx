import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/recipeCard/recipeCard";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { isLoggedIn, user, login, logout } = useAuth();
    const [activeButton, setActiveButton] = useState("My Recipes");
    const [savedPosts, setSavedPosts] = useState([]);
    const [personalPosts, setPersonalPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [preview, setPreview] = useState("");
    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const postsPerPage = 12; // Number of posts per page
    const navigate = useNavigate();

    const handleAddNewRecipe = () => {
        navigate("/profile/add-recipe");
    };

    // Load current user data into form fields
    useEffect(() => {
        if (user) {
            setDisplayName(user.username || "");
            setPreview(user.avatar || ""); // Assume avatar URL is in user object
        }
    }, [user]);

    useEffect(() => {
        const fetchSavedPosts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/users/save-post", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include cookies for authentication
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch saved posts");
                }

                const savedData = await response.json();
                setSavedPosts(savedData.savedPosts);
            } catch (error) {
                console.error("Error fetching saved posts:", error);
                setError(error.message);
            }
        };

        const fetchPersonalPosts = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/users/personal-post", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include cookies for authentication
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch personal posts");
                }

                const personalData = await response.json();
                setPersonalPosts(personalData.personalPosts);
            } catch (error) {
                console.error("Error fetching personal posts:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSavedPosts();
        fetchPersonalPosts();
    }, []);

    // Pagination calculations
    const activePosts =
        activeButton === "My Recipes" ? personalPosts : savedPosts;
    const totalPages = Math.ceil(activePosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = activePosts.slice(startIndex, startIndex + postsPerPage);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="bg-white text-black w-full max-w-4xl p-4 rounded-lg flex items-center justify-between ml-20">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500" href="#">
                        Home
                    </span>
                    <span className="text-gray-500">&gt;</span>
                    <span className="text-blue-500" href="#">
                        Your Recipe Box
                    </span>
                </div>
            </div>

            <div className="bg-white p-8 mx-16">
                <div>
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-3xl font-bold mb-4">{displayName}'s Recipe Box</h1>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            onClick={handleAddNewRecipe}
                        >
                            Add a Recipe
                        </button>
                    </div>
                    <div className="p-4 rounded-lg flex items-center">
                        <img
                            alt={`Profile picture of ${displayName}`}
                            className="rounded-full mr-4"
                            height="50"
                            src={preview}
                            width="150"
                        />
                        <p className="text-lg">
                            {displayName} is a deputy editor at Chefify,
                            bringing her expertise as a former cooking editor at
                            The Los Angeles Times. She is also an accomplished
                            author, contributing to numerous cookbooks and food
                            publications. Originally from East Los Angeles, Emma
                            now resides in New York City, where she explores a
                            wide range of culinary delights.
                        </p>
                    </div>
                </div>

                <div className="flex items-center pt-6">
                    <span
                        className={`cursor-pointer ${
                            activeButton === "My Recipes"
                                ? "bg-gray-200 text-blue-700 font-bold rounded-tl-xl rounded-tr-xl p-3"
                                : "ml-2 text-gray-700 p-3"
                        }`}
                        onClick={() => {
                            setActiveButton("My Recipes");
                            setCurrentPage(1); // Reset to page 1
                        }}
                    >
                        My Recipes
                    </span>
                    <span
                        className={`cursor-pointer ${
                            activeButton === "Saved Recipe"
                                ? "bg-gray-200 text-blue-700 font-bold rounded-tl-xl rounded-tr-xl p-3"
                                : "ml-2 text-gray-700 p-3"
                        }`}
                        onClick={() => {
                            setActiveButton("Saved Recipe");
                            setCurrentPage(1); // Reset to page 1
                        }}
                    >
                        Saved Recipes
                    </span>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="grid grid-cols-4 gap-4 gap-y-8 pt-6 pb-6">
                    {currentPosts.map((item, index) => (
                        <div className="w-full sm:w-1/2 lg:w-1/4" key={index}>
                            <RecipeCard recipe={item} isSaved={activeButton === "Saved Recipe"} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center items-center space-x-2 pr-6 pb-6">
                    <button
                        className="p-2 rounded-full hover:bg-gray-300"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        &lt;
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`px-4 py-2 ${
                                currentPage === i + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            } rounded-md`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="p-2 rounded-full hover:bg-gray-300"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;