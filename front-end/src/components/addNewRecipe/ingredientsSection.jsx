import React, { useState } from 'react';
import {FaPlus} from 'react-icons/fa'
import { LuArrowDownUp } from "react-icons/lu";
import { CiCircleRemove } from "react-icons/ci";

const NewRecipeIngredientsSection = () => {
  const [ingredients, setIngredients] = useState([
    { id: 1, text: 'e.g. 2 cups flour, sifted' },
    { id: 2, text: 'e.g. 1 cup sugar' },
    { id: 3, text: 'e.g. 2 tablespoons butter, softened' },
  ]);

  const handleAddIngredient = () => {
    const newIngredient = { id: Date.now(), text: 'Your new ingredient' };
    setIngredients([...ingredients, newIngredient]);
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleInputChange = (id, newText) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, text: newText } : ingredient
      )
    );
  };

  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Ingredients</h2>
      <p className="mb-4">
        Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any
        special preparation (i.e. sifted, softened, chopped).
      </p>
      <p className="mb-4">
        Enter ingredients below or <a href="#" className="text-orange-600">Add several at once</a>
      </p>
      <div className="flex items-center justify-end mb-4">
        <LuArrowDownUp className='text-gray-600' />
        <span className="text-gray-600 font-bold ml-2">REORDER</span>
      </div>
      <div className="space-y-4">
        {ingredients.map((ingredient) => (
            <div key={ingredient.id} className="flex items-center space-x-2">
                <input
                type="text"
                placeholder={ingredient.text}
                onChange={(e) => handleInputChange(ingredient.id, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
                />
                <button
                    className="text-gray-600"
                    onClick={() => handleDeleteIngredient(ingredient.id)}
                >
                    <CiCircleRemove/>
                </button>
            </div>
        ))}
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          className="flex items-center px-4 py-2 border border-orange-600 text-orange-600 rounded"
          onClick={handleAddIngredient}
        >
            <FaPlus className='mr-2' />
            ADD INGREDIENT
        </button>
      </div>
    </div>
  );
};

export default NewRecipeIngredientsSection;