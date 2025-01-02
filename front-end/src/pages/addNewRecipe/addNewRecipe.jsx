import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewRecipeInfoSection from "../../components/addNewRecipe/recipeInfoSection";
import NewRecipeIngredientsSection from "../../components/addNewRecipe/ingredientsSection";
import NewRecipeDirectionsSection from "../../components/addNewRecipe/directionsSection";
import NewRecipeOtherSection from "../../components/addNewRecipe/timeSection";
import { useAuth } from "../../contexts/AuthContext";

const AddNewRecipe = () => {
  const navigate = useNavigate();
  const {isLoggedIn, user, login, logout} = useAuth();

  // State to store form data
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    category: "",
    area: "",
    content: "", // Directions
    contentIngredients: [], // Ingredients with measures
    video: "",
    duration: 0,
    tags: [],
    photo: ""
  });

  const handleCancel = () => {
    navigate(-1); // Navigate back
  };

  const handleChange = (field, value) => {
    setRecipeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Call backend API
      // Add user as the author
      const postData = { ...recipeData, author: user?._id };
      const response = await fetch("http://localhost:3000/api/posts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding recipe:", errorData.message);
        alert(`Failed to submit recipe: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      console.log(data);
  
      alert(`Recipe submitted successfully`);
      // Redirect to profile page
      navigate("/profile");
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  return (
    <div className="bg-white text-gray-800 max-w-4xl mx-auto p-6 flex-col">
      <NewRecipeInfoSection onChange={(data) => {
        handleChange("title", data.title);
        handleChange("description", data.description);
        handleChange("photo", data.photo);
      }} />
      <hr className="mb-6 mt-2" />
      <NewRecipeIngredientsSection
        onChange={(data) => handleChange("contentIngredients", data.ingredients)}
      />
      <hr className="mb-6 mt-2" />
      <NewRecipeDirectionsSection onChange={(data) => handleChange("content", data.content)} />
      <hr className="mb-6 mt-2" />
      <NewRecipeOtherSection
        onChange={(data) => {
          handleChange("category", data.category);
          handleChange("area", data.area);
          handleChange("duration", data.duration);
          handleChange("video", data.video);
        }}
      />
      <hr className="mb-6 mt-2" />
      <div className="flex space-x-4 justify-end">
        <button
          className="text-black font-bold hover:underline"
          onClick={handleCancel}
        >
          CANCEL
        </button>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit Recipe
        </button>
      </div>
    </div>
  );
};

export default AddNewRecipe;