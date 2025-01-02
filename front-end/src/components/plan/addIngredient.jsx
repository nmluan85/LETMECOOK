import React, { useState, useEffect } from "react";
import { use } from "react";

const AddIngredient = ({ingre, listIngredients}) => {
  const [ingredients, setIngredients] = useState(ingre); // Store selected ingredients
  const [searchTerm, setSearchTerm] = useState(""); // Store search input value
  const allIngredients = [
    "strawberry", "beef", "cheese", "flour", "pork",
    "tomatto", "onion", "garlic", "chicken", "egg",
    "carrot", "salt", "oil", "corn", "bean", "rice",
    "potato", "milk", "butter", "sugar", "bread",
    "lettuce", "cucumber", "apple", "banana", "orange",
    "grape", "watermelon", "pineapple", "mango", "pear",
    "kiwi", "blueberry", "peach", "plum", "apricot",
    "cherry", "lemon", "lime", "avocado", "papaya",
    "coconut", "fig", "melon", "pomegranate", "cranberry",
  ];
  useEffect(() => {
    listIngredients(ingredients);
  }, [ingredients]);
  // Handle tag selection
  const handleTagClick = (tag) => {
    if (!ingredients.includes(tag)) {
      setIngredients([...ingredients, tag]); // Add to selected ingredients
    }
  };

  // Handle manual input
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Add ingredient manually when pressing Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      if (!ingredients.includes(searchTerm.trim())) {
        setIngredients([...ingredients, searchTerm.trim()]);
      }
      setSearchTerm(""); // Clear the search input
      e.preventDefault(); // Prevent form submission
    }
  };

  // Remove ingredient from input
  const handleRemoveIngredient = (ingredient) => {
    setIngredients(ingredients.filter((ing) => ing !== ingredient));
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block font-medium mb-2">Ingredient</label>
        <div className="border border-gray-300 rounded-md p-2 flex flex-wrap gap-2">
          {ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
              onClick={() => handleRemoveIngredient(ingredient)}
            >
              {ingredient} &times;
            </span>
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
        <div className="flex flex-wrap gap-2 overflow-auto" 
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, // Limit to 3 rows
            overflow: "hidden", // Hide any overflowing content
            maxHeight: "calc(3 * 2.5rem)", // Adjust for 3 rows (2.5rem row height + gap)
          }}
        >
          {allIngredients
            .filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) // Filter tags by search
            .map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer m-1 ${
                  ingredients.includes(tag)
                    ? "bg-primary-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleTagClick(tag)}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddIngredient;
