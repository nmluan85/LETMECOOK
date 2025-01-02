import React, { useEffect, useState } from "react";
import RecipeCard from "../../components/recipeCard/recipeCard";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { isLoggedIn, user, login, logout } = useAuth();
    const [activeButton, setActiveButton] = useState("My Recipes");
    const [savedPosts, setSavedPosts] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userRole, setRole] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;
    const postsToShow = activeButton === "My Recipes" ? myPosts : savedPosts;

    // Calculate the index of the first and last posts for the current page
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = postsToShow.slice(firstPostIndex, lastPostIndex);

    // Calculate the total number of pages
    const totalPages = Math.ceil(postsToShow.length / postsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddNewRecipe = () => {
        navigate("/profile/add-recipe");
    };

    // Load current user data into form fields
    useEffect(() => {
        console.log(user);
        if (user) {
            setRole(user.role || "");
            setRole(user.role || "");
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
                setIsLoading(false);
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
                setMyPosts(personalData.personalPosts);
            } catch (error) {
                console.error("Error fetching personal posts:", error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchSavedPosts();
        fetchPersonalPosts();
        setIsLoading(false);
    }, []);


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
                        <h1 className="text-3xl font-bold mb-4">
                            {displayName}'s Recipe Box
                        </h1>
                        {(userRole === "Admin" ||
                            userRole === "PremiumUser") && (
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={() => {
                                    handleAddNewRecipe();
                                }}
                            >
                                Add a Recipe
                            </button>
                        )}
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
                        onClick={() => setActiveButton("My Recipes")}
                    >
                        My Recipes
                    </span>
                    <span
                        className={`cursor-pointer ${
                            activeButton === "Saved Recipe"
                                ? "bg-gray-200 text-blue-700 font-bold rounded-tl-xl rounded-tr-xl p-3"
                                : "ml-2 text-gray-700 p-3"
                        }`}
                        onClick={() => setActiveButton("Saved Recipe")}
                    >
                        Saved Recipe
                    </span>
                </div>
                <hr className="border-t border-gray-300" />
                {postsToShow.length === 0 ? (
                    <div className="text-center text-gray-500 mt-6">
                        {activeButton === "My Recipes"
                            ? "You have not uploaded any posts"
                            : "You have not saved any post"}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-4 gap-4 gap-y-8 pt-6 pb-6">
                            {currentPosts.map((item, index) => (
                                <div
                                    className="w-full sm:w-1/2 lg:w-1/4"
                                    key={index}
                                >
                                    {
                                        <RecipeCard
                                            recipe={item}
                                            isSaved={true}
                                        />
                                    }
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end items-center space-x-2 pr-6 pb-6">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-3 py-1 mx-1 border rounded ${
                                        currentPage === index + 1
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-blue-500 border-blue-500"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;