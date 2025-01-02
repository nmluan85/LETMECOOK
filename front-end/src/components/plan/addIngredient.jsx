import { id } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { use } from "react";

const AddIngredient = ({ingre, listIngredients}) => {
  const [ingredients, setIngredients] = useState(
    ingre.map((item) => ({ ingredient: item.ingredient, weight: item.weight, id: item.id}))
  );
  const [searchTerm, setSearchTerm] = useState(""); // Store search input value
  const [allIngredients, setAllIngredients] = useState([]);
  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);
  useEffect(() => { 
    const fetchIngredients = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/ingredients/names", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          const data = await response.json();
          setAllIngredients(data);
      } catch (error) {
          console.log(error.message || "An unexpected error occurred.");
      }
    };
    fetchIngredients();
  }, []);
  useEffect(() => {
    listIngredients(ingredients);
  }, [ingredients]);

  // Handle tag selection
  const handleTagClick = (tag) => {
    if (!ingredients.find((ing) => ing.name === tag.name)) {
      setIngredients([...ingredients, { ingredient: tag.name, weight: "" , id: tag.id}]); // Add ingredient with default weight
    }
  };

  // Handle manual input
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Add ingredient manually when pressing Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      if (!ingredients.find((ing) => ing.ingredient === searchTerm.trim())) {
        setIngredients([
          ...ingredients,
          { ingredient: searchTerm.trim(), weight: ""},
        ]);
      }
      setSearchTerm("");
      e.preventDefault();
    }
  };

  // Remove ingredient
  const handleRemoveIngredient = (ingredientName) => {
    setIngredients(ingredients.filter((ing) => ing.ingredient !== ingredientName));
  };

  // Handle weight change
  const handleWeightChange = (ingredientName, weight) => {
    setIngredients(
      ingredients.map((ing) =>
        ing.ingredient === ingredientName ? { ...ing, weight } : ing
      )
    );
  };
  return (
    <div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Selected Ingredients</label>
        <div className="border border-gray-300 rounded-md p-2 flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.ingredient}
              className="flex items-center gap-2 bg-primary-100 px-2 py-1 rounded-md"
            >
              <span className="text-primary-500 font-medium">
                {ingredient.ingredient}
              </span>
              <input
                type="number"
                className="w-20 border border-gray-300 rounded-md px-2 py-1"
                placeholder="gram?"
                value={ingredient?.weight}
                onChange={(e) => { 
                  const value = e.target.value;
                  if (value >= 0) {
                    handleWeightChange(ingredient.ingredient, Number(value));
                  }
                }}
              />
              <button
                className="text-red-500 font-bold"
                onClick={() => handleRemoveIngredient(ingredient.ingredient)}
              >
                &times;
              </button>
            </div>
          ))}
          <input
            type="text"
            className="flex-grow focus:outline-none"
            placeholder="Search or add ingredient"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Available Ingredients</label>
        <div
          className="flex flex-wrap gap-2 overflow-auto"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, // Limit to 3 rows
            overflow: "hidden", // Hide any overflowing content
            maxHeight: "calc(3 * 2.5rem)", // Adjust for 3 rows (2.5rem row height + gap)
          }}
        >
          {allIngredients
            .filter((tag) =>
              tag.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) // Filter tags by search
            .map((tag) => (
              <button
                key={tag.name}
                className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer m-1 ${
                  ingredients.find((ing) => ing.ingredient === tag.name)
                    ? "bg-primary-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddIngredient;
