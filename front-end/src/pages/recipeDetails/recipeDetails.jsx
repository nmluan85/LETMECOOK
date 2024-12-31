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
    
        // Split the content into steps with delimiter \r\n
        const steps = item.content.split('\r\n');
    
        // Extract the ingredients array from contentIngredients
        const ingredientsArr = item.contentIngredients.map(({ ingredient, measure }) => `${measure} ${ingredient}`);
    
        // Output the results
        setRecipeInfo({
            item,
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