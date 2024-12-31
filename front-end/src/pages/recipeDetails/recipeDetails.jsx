import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa"
import SaveButton from "../../components/recipeCard/saveButton";
import ReactionButton from "../../components/recipeDetails/ReactionPicker";
import CommentSection from "../../components/recipeDetails/commentSection";

const RecipeDetails = () => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("");
    const [recipeInfo, setRecipeInfo] = useState({
        title: "",
        steps: [],
        img: "",
        authorAvatar: "",
        ingredientsArr: [],
        isSaved: false
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSavedStatus = async (postId) => {
            try {
                const response = await fetch(`http://localhost:3000/api/users/save-post/${postId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include', // Include cookies for authentication
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                if (data.success) {
                    setRecipeInfo((prev) => ({
                        ...prev,
                        isSaved: data.isSaved
                    }));
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error checking if post is saved:', error);
                setError(error.message);
                setIsLoading(false);
            }
        };

        console.log(location.state.item)
        const parts = location.state.item.content.split('\n');
        // Extract the introduction
        const introduction = parts[0];
        // Extract the steps
        const steps = [];
        let i = 1;
        while (i < parts.length) {
            const line = parts[i];
            if (line.startsWith("Step")) {
                steps.push(parts[i + 1]); // Add step content to the array
                i += 2;
            } else {
                break;
            }
        }
        // Extract the ingredients
        const ingredientsStartIndex = steps.length * 2 + 1; // Use the array length directly
        const ingredientsArr = parts.slice(ingredientsStartIndex);

        // Output the results
        setRecipeInfo({
            ...location.state.item,
            introduction,
            steps,
            ingredientsArr
        });

        fetchSavedStatus(location.state.item._id);

        setPrevLocation(location.pathname);
    }, [location]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* Breadcrumbs */}
            <div 
            className="bg-white text-black w-full max-w-4xl p-4 rounded-lg flex items-center justify-between ml-8">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500" href="#">
                        Home
                    </span>
                    <span className="text-gray-500">
                        &gt;
                    </span>
                    <span className="text-blue-500" href="#">
                        Cooking guide
                    </span>
                </div>
            </div>

            {/* Recipe content */}
            <div className="flex">
                {/* Left side */}
                <div className="w-2/5 bg-white p-8">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold mb-4">
                            How to make a {recipeInfo.title}
                        </h1>
                        <p className="text-gray-700 mb-4">
                            {recipeInfo.introduction}
                        </p>
                        <div className="flex items-center mb-6">
                            <ReactionButton/>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                            <img 
                                alt={`Profile picture of ${recipeInfo.author?.username || 'user'}`} 
                                className="w-12 h-12 rounded-full mr-4" 
                                height="50" 
                                src={recipeInfo.author?.avatar} 
                                width="50"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">
                                    {recipeInfo.author?.username || 'Anonymous'}
                                </h2>
                            </div>
                            <SaveButton recipeId={recipeInfo._id} isClicked={recipeInfo.isSaved} onClick={() => {}}/>
                        </div>
                        <div className="flex justify-between items-center mt-5">
                            <div className="mr-6 flex flex-col items-center">
                                <p className="text-gray-500 text-sm">
                                    Time:
                                </p>
                                <p className="text-lg font-semibold">
                                    {recipeInfo.duration} minutes
                                </p>
                            </div>
                            <div className="mr-6 flex flex-col items-center">
                                <p className="text-gray-500 text-sm">
                                    Comment
                                </p>
                                <p className="text-lg font-semibold">
                                    {recipeInfo.comments ? Object.keys(recipeInfo.comments).length : 0} comments
                                </p>
                            </div>
                            <div className="mr-6 flex flex-col items-center">
                                <p className="text-gray-500 text-sm">
                                    Rating:
                                </p>
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-500 cursor-pointer"/>
                                    <FaStar className="text-yellow-500 cursor-pointer"/>
                                    <FaStar className="text-yellow-500 cursor-pointer"/>
                                    <FaStar className="text-yellow-500 cursor-pointer"/>
                                    <FaStar className="text-gray-400 cursor-pointer"/>
                                </div>
                            </div>
                        </div>

                        <div className="border-dashed border-2 border-blue-400 p-6 rounded-lg bg-white shadow-md mt-5">
                            <ul className="list-none space-y-2">
                                {recipeInfo.ingredientsArr && recipeInfo.ingredientsArr.map((ingredient, index) => (
                                    <li key={index}>
                                        - {ingredient}{" "}
                                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs ml-2 text-center">
                                            {ingredient.split(" ").pop()} {/* Display last word as tag */}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center">
                                <i className="fas fa-plus mr-2"></i> Add to Your Grocery List
                            </button>
                        </div>

                    </div>    
                </div>

                {/* Right side */}
                <div className="w-3/5 bg-white p-8 flex flex-col">
                    <img alt="" className="rounded-lg w-[600px] h-[400px] object-cover flex justify-center mb-8" src={recipeInfo.photo}/>
                    <div>
                        {
                            recipeInfo.steps && recipeInfo.steps.map((item, index) => (
                                <div class="mt-4">
                                    <h2 class="text-xl font-semibold">
                                        Step {index + 1}
                                    </h2>
                                    <p class="mt-2 text-gray-700 my-4">
                                        {item}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Comment Section */}
            <div className="w-full p-4">
                <CommentSection />
            </div>

        </div>
    );
};

export default RecipeDetails;