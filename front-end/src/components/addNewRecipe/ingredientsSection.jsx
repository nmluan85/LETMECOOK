import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LuArrowDownUp } from "react-icons/lu";
import { CiCircleRemove } from "react-icons/ci";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const NewRecipeIngredientsSection = () => {
    const [ingredients, setIngredients] = useState([
        { id: "1", input: "" },
        { id: "2", input: "" },
        { id: "3", input: "" },
    ]);
    const [isReordering, setIsReordering] = useState(false);
    // Function to parse input into measure and ingredient
    const parseInput = (input) => {
        const words = input.trim().split(/\s+/); // Split by whitespace
        if (words.length < 3) {
            // If fewer than 3 words, treat all as measure or ingredient
            return { measure: "", ingredient: input };
        }
        return {
            measure: words.slice(0, 2).join(" "), // First two words as measure
            ingredient: words.slice(2).join(" "), // Rest as ingredient
        };
    };

    const updateParent = (updatedIngredients) => {
        const parsedIngredients = updatedIngredients.map((item) => ({
            ...parseInput(item.input),
        }));
        onChange({ ingredients: parsedIngredients });
    };

    const handleAddIngredient = () => {
        const newIngredient = { id: Date.now().toString(), input: "" };
        const updatedIngredients = [...ingredients, newIngredient];
        setIngredients(updatedIngredients);
        updateParent(updatedIngredients);
    };

    const handleDeleteIngredient = (id) => {
        const updatedIngredients = ingredients.filter((item) => item.id !== id);
        setIngredients(updatedIngredients);
        updateParent(updatedIngredients);
    };

    const handleInputChange = (id, value) => {
        const updatedIngredients = ingredients.map((item) =>
            item.id === id ? { ...item, input: value } : item,
        );
        setIngredients(updatedIngredients);
        updateParent(updatedIngredients);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedIngredients = Array.from(ingredients);
        const [movedItem] = reorderedIngredients.splice(result.source.index, 1);
        reorderedIngredients.splice(result.destination.index, 0, movedItem);

        setIngredients(reorderedIngredients);
        updateParent(reorderedIngredients);
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Ingredients*</h2>
            <p className="mb-4">
                Enter one ingredient per line. Include the quantity (i.e. cups,
                tablespoons) and any special preparation (i.e. sifted, softened,
                chopped).
            </p>
            <p className="mb-4">
                Enter ingredients below or{" "}
                <a href="#" className="text-blue-500">
                    Add several at once
                </a>
            </p>
            <button
                className="flex items-center justify-end mb-4 cursor-pointer"
                onClick={() => setIsReordering(!isReordering)}
            >
                {isReordering ? (
                    <>
                        <span className="text-blue-500 font-bold mr-2">
                            DONE
                        </span>
                    </>
                ) : (
                    <>
                        <LuArrowDownUp className="text-gray-600" />
                        <span className="text-gray-600 font-bold ml-2">
                            REORDER
                        </span>
                    </>
                )}
            </button>

            {isReordering ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="ingredients">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="space-y-4"
                            >
                                {ingredients.map((ingredient, index) => (
                                    <Draggable
                                        key={ingredient.id}
                                        draggableId={ingredient.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="flex items-center space-x-2 bg-gray-100 p-2 rounded"
                                            >
                                                <span className="flex-1">
                                                    {ingredient.input ||
                                                        "3 tbsp butter, melted"}
                                                </span>
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
                        <div
                            key={ingredient.id}
                            className="flex items-center space-x-2"
                        >
                            <input
                                type="text"
                                placeholder={"3 tbsp butter, melted"}
                                onChange={(e) =>
                                    handleInputChange(
                                        ingredient.id,
                                        e.target.value,
                                    )
                                }
                                className="flex-1 p-2 border border-gray-300 rounded"
                            />
                            <button
                                className="text-gray-600 cursor-pointer"
                                onClick={() =>
                                    handleDeleteIngredient(ingredient.id)
                                }
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
