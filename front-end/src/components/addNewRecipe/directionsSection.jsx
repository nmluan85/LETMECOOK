import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { LuArrowDownUp } from 'react-icons/lu';
import { CiCircleRemove } from 'react-icons/ci';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const NewRecipeDirectionsSection = () => {
  const [directions, setDirections] = useState([
    { id: '1', text: 'e.g. Preheat oven to 350 degree F...' },
    { id: '2', text: 'e.g. Combine all dry ingredients in a large bowl...' },
    { id: '3', text: 'e.g. Pour into greased trays and bake for 15-20 minutes...' },
  ]);
  const [isReordering, setIsReordering] = useState(false);

  const handleAddDirection = () => {
    const newDirection = { id: Date.now().toString(), text: 'Your new direction' };
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedDirections = Array.from(directions);
    const [movedItem] = reorderedDirections.splice(result.source.index, 1);
    reorderedDirections.splice(result.destination.index, 0, movedItem);

    setDirections(reorderedDirections);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Directions</h2>
      <p className="mb-4">
        Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe (i.e. Prep, Bake, Decorate).
      </p>
      <p className="mb-4">
        Enter directions below or <a href="#" className="text-blue-500">Add several at once</a>
      </p>
      <button
        className="flex items-center justify-end mb-4 cursor-pointer"
        onClick={() => setIsReordering(!isReordering)}
      >
        {isReordering ? (
          <button className="text-blue-500 border-blue-500 font-bold mr-2">DONE</button>
        ) : (
          <>
            <LuArrowDownUp className="text-gray-600" />
            <span className="text-gray-600 font-bold ml-2">REORDER</span>
          </>
        )}
      </button>

      {isReordering ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="directions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {directions.map((direction, index) => (
                  <Draggable key={direction.id} draggableId={direction.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center space-x-2 bg-gray-100 p-2 rounded"
                      >
                        <span className="flex-1">{direction.text}</span>
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
          {directions.map((direction, index) => (
            <div key={direction.id} className="space-x-2">
              {/* Displaying the Step Number */}
              <p className="font-semibold mb-2">Step {index + 1}</p>
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder={direction.text}
                  onChange={(e) => handleInputChange(direction.id, e.target.value)}
                  className="flex-1 p-2 mr-2 border border-gray-300 rounded"
                />
                <button
                  className="text-gray-600 cursor-pointer"
                  onClick={() => handleDeleteDirection(direction.id)}
                >
                  <CiCircleRemove />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isReordering && (
        <div className="mt-6 flex space-x-4">
          <button
            className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
            onClick={handleAddDirection}
          >
            <FaPlus className="mr-2" />
            ADD STEP
          </button>

        </div>
      )}
    </div>
  );
};

export default NewRecipeDirectionsSection;