import React, { useEffect } from "react";
import { useState } from "react";
import RecipeCard from "../recipeCard/recipeCard";
import { useNavigate } from "react-router-dom";

const CategoryPreview = ({ category, savedPosts }) => {
    const [recipes, setRecipes] = useState([]);
    const [previewRecipes, setPreviewRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleCategoryAll = () => {
        navigate(`/category/${category}`, {
            state: {
                recipes: recipes,
                savedPosts: savedPosts,
            },
        });
    };

    useEffect(() => {
        fetch(`http://localhost:3000/api/posts/category/${category}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch all posts");
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data) && data.length === 0) {
                    setError("No posts found for this category.");
                } else {
                    // Limit to 4 recipes
                    setRecipes(data);
                    setPreviewRecipes(data.slice(0, 4));
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [category]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return null; // Do not render anything if there is an error
    }

    return (
        <div className="bg-white text-gray-800">
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-center text-3xl font-bold mb-8">
                    {category.toUpperCase()}
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center">
                    {previewRecipes.map((recipe, index) => (
                        <div className="pt-4 pb-6 pl-2 pr-2" key={index}>
                            <RecipeCard
                                recipe={recipe}
                                isSaved={savedPosts.some(
                                    (savedPost) => savedPost._id === recipe._id,
                                )}
                            />
                        </div>
                    ))}
                </div>
                {recipes.length > 4 && (
                    <div className="text-center mt-8">
                        <button
                            onClick={handleCategoryAll}
                            className="text-blue-500 underline text-lg"
                        >
                            See more {category} recipes →
                        </button>
                    </div>
                )}
            </div>
            <hr className="mb-6 mt-2" />
        </div>
    );
};

export default CategoryPreview;
