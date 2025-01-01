import React, { useState } from 'react';
import {FaPlus} from 'react-icons/fa'
import { LuArrowDownUp } from "react-icons/lu";
import { CiCircleRemove } from "react-icons/ci";

const NewRecipeDirectionsSection = () => {
  const [directions, setDirections] = useState([
    { id: 1, text: 'e.g. Preheat oven to 350 degree F...' },
    { id: 2, text: 'e.g. Combine all dry ingredients in a large bowl...' },
    { id: 3, text: 'e.g. Pour into greased trays and bake for 15-20 minutes...' },
  ]);

  const handleAddDirection = () => {
    const newDirection = { id: Date.now(), text: 'Your new direction' };
    setDirections([...directions, newDirection]);
  };

  const handleDeleteDirection = (id) => {
    setDirections(directions.filter((direction) => direction.id !== id));
  };

  const handleInputChange = (id, newText) => {
    setDirections(
      directions.map((direction) =>
        direction.id === id ? { ...direction, text: newText } : direction
      )
    );
  };

  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Directions</h2>
      <p className="mb-4">
        Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate).
      </p>
      <p className="mb-4">
        Enter directions below or <a href="#" class="text-red-600">Add several at once</a>
      </p>
      <div className="flex items-center justify-end mb-4">
        <LuArrowDownUp className='text-gray-600' />
        <span className="text-gray-600 font-bold ml-2">REORDER</span>
      </div>
      <div className="space-y-4">
        {directions.map((direction) => (
            <div key={direction.id} className="flex items-center space-x-2">
                <input
                type="text"
                placeholder={direction.text}
                onChange={(e) => handleInputChange(direction.id, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
                />
                <button
                    className="text-gray-600"
                    onClick={() => handleDeleteDirection(direction.id)}
                >
                    <CiCircleRemove/>
                </button>
            </div>
        ))}
      </div>
      <div className="mt-6 flex space-x-4">
        <button
          className="flex items-center px-4 py-2 border border-orange-600 text-orange-600 rounded"
          onClick={handleAddDirection}
        >
            <FaPlus className='mr-2' />
            ADD STEP
        </button>
      </div>
    </div>
  );
};

export default NewRecipeDirectionsSection;