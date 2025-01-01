import React from "react";
import NewRecipeInfoSection from "../../components/addNewRecipe/recipeInfoSection";
import NewRecipeIngredientsSection from "../../components/addNewRecipe/ingredientsSection";
import NewRecipeDirectionsSection from "../../components/addNewRecipe/directionsSection";

const AddNewRecipe = () => {
  return (
    <div className="bg-white text-gray-800 max-w-4xl mx-auto p-6">
        <NewRecipeInfoSection />
        <hr className="mb-6 mt-2" />
        <NewRecipeIngredientsSection />
        <hr className="mb-6 mt-2" />
        <NewRecipeDirectionsSection />
        <hr className="mb-6 mt-2" />
    </div>
  );
};

export default AddNewRecipe;