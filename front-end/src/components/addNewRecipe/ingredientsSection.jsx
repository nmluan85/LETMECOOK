import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { LuArrowDownUp } from 'react-icons/lu';
import { CiCircleRemove } from 'react-icons/ci';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const NewRecipeIngredientsSection = () => {
  const [ingredients, setIngredients] = useState([
    { id: '1', text: 'e.g. 2 cups flour, sifted' },
    { id: '2', text: 'e.g. 1 cup sugar' },
    { id: '3', text: 'e.g. 2 tablespoons butter, softened' },
  ]);
  const [isReordering, setIsReordering] = useState(false);

  const handleAddIngredient = () => {
    const newIngredient = { id: Date.now().toString(), text: 'Your new ingredient' };
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedIngredients = Array.from(ingredients);
    const [movedItem] = reorderedIngredients.splice(result.source.index, 1);
    reorderedIngredients.splice(result.destination.index, 0, movedItem);

    setIngredients(reorderedIngredients);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Ingredients</h2>
      <p className="mb-4">
        Enter one ingredient per line. Include the quantity (i.e. cups, tablespoons) and any
        special preparation (i.e. sifted, softened, chopped).
      </p>
      <p className="mb-4">
        Enter ingredients below or <a href="#" className="text-blue-500">Add several at once</a>
      </p>
      <button
        className="flex items-center justify-end mb-4 cursor-pointer"
        onClick={() => setIsReordering(!isReordering)}
      >
        {isReordering ? (
          <>
            <span className="text-blue-500 font-bold mr-2">DONE</span>
          </>
        ) : (
          <>
            <LuArrowDownUp className='text-gray-600' />
            <span className="text-gray-600 font-bold ml-2">REORDER</span>
          </>
        )}
      </button>

      {isReordering ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="ingredients">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {ingredients.map((ingredient, index) => (
                  <Draggable key={ingredient.id} draggableId={ingredient.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center space-x-2 bg-gray-100 p-2 rounded"
                      >
                        <span className="flex-1">{ingredient.text}</span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
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
                className="text-gray-600 cursor-pointer"
                onClick={() => handleDeleteIngredient(ingredient.id)}
              >
                <CiCircleRemove />
              </button>
            </div>
          ))}
        </div>
      )}

      {!isReordering && (
        <div className="mt-6 flex space-x-4">
          <button
            className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
            onClick={handleAddIngredient}
          >
            <FaPlus className="mr-2" />
            ADD INGREDIENT
          </button>
        </div>
      )}
    </div>
  );
};

export default NewRecipeIngredientsSection;