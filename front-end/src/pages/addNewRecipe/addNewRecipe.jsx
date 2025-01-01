import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import NewRecipeInfoSection from "../../components/addNewRecipe/recipeInfoSection";
import NewRecipeIngredientsSection from "../../components/addNewRecipe/ingredientsSection";
import NewRecipeDirectionsSection from "../../components/addNewRecipe/directionsSection";
import NewRecipeTimeSection from "../../components/addNewRecipe/timeSection";

const AddNewRecipe = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };
  return (
    <div className="bg-white text-gray-800 max-w-4xl mx-auto p-6 flex-col">
        <NewRecipeInfoSection />
        <hr className="mb-6 mt-2" />
        <NewRecipeIngredientsSection />
        <hr className="mb-6 mt-2" />
        <NewRecipeDirectionsSection />
        <hr className="mb-6 mt-2" />
        <NewRecipeTimeSection />
        <hr className="mb-6 mt-2" />
        <div class="flex space-x-4 justify-end">
          <button class="text-black font-bold hover:underline" onClick={handleCancel}>CANCEL</button>
          <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
            Submit Recipe
          </button>
        </div>
    </div>
  );
};

export default AddNewRecipe;