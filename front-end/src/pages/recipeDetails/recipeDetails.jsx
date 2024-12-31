import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CommentSection from "../../components/recipeDetails/commentSection";
import RecipeDetailsBreadcrumbs from "../../components/recipeDetails/breadcrumbs";
import IngredientsSection from "../../components/recipeDetails/ingredientsSection";
import RecipeDetailsInfoSection from "../../components/recipeDetails/infoSection";
import RecipeStepsSection from "../../components/recipeDetails/recipeStepsSection";

const RecipeDetails = () => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("");
    const [recipeInfo, setRecipeInfo] = useState({
        item: {},
        introduction: "",
        steps: [],
        ingredientsArr: [],
        isSaved: false
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("Location state: ", location.state);
        const { item, isSaved } = location.state;
        const parts = item.content.split('\n');
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
            item,
            introduction,
            steps,
            ingredientsArr,
            isSaved
        });

        setIsLoading(false);

        setPrevLocation(location.pathname);
    }, [location]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Breadcrumbs */}
            <RecipeDetailsBreadcrumbs />

            {/* Recipe content */}
            <div className="flex">
                {/* Left side */}
                <div className="w-2/5 bg-white p-8">
                    <div className="max-w-2xl mx-auto">
                        <RecipeDetailsInfoSection recipeInfo={recipeInfo} />
                        {/* Ingredients section */}
                        <IngredientsSection recipeInfo={recipeInfo} />
                    </div>
                </div>

                {/* Right side */}
                <div className="w-3/5 bg-white p-8 flex flex-col">
                    <RecipeStepsSection recipeInfo={recipeInfo} />
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