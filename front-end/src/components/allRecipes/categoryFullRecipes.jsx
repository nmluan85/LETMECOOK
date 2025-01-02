import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import RecipeCard from '../recipeCard/recipeCard';

const CategoryFullRecipes = () => {
    const { category } = useParams();
    const [recipesList, setRecipesList] = useState([]);
    const [savedPostList, setSavedPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const {recipes, savedPosts} = location.state;
        setRecipesList(recipes);
        setSavedPostList(savedPosts);

        setIsLoading(false);
    }, [category]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-white text-gray-800">
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-center text-3xl font-bold mb-8">{category.toUpperCase()} RECIPES</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {recipesList.map((recipe, index) => (
                        <div className="pt-4 pb-6 pl-2 pr-2" key={index}>
                            <RecipeCard 
                                recipe={recipe}
                                isSaved={savedPostList.some(savedPost => savedPost._id === recipe._id)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryFullRecipes;