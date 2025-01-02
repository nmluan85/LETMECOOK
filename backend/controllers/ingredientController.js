import Ingredient from '../models/ingredientModel.js';

// Controller to view an ingredient
const viewIngredient = async (req, res) => {
    try {
        const { ingredientId } = req.params;
        const ingredient = await Ingredient.findById(ingredientId);
        res.status(200).json(ingredient);
    } catch (error) {
        console.error('Error viewing ingredient:', error);
        res.status(500).json({ message: 'Server error. Could not view ingredient.' });
    }
};

// Controller to create a new ingredient
const createIngredient = async (req, res) => {
    try {
        const { name, nutrition } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required.' });
        }

        // Create ingredient object with required and optional fields
        const ingredientData = {
            name,
            nutrition: nutrition || {} // Optional nutrition data
        };

        const newIngredient = new Ingredient(ingredientData);
        await newIngredient.save();
        
        res.status(201).json({ 
            message: 'Ingredient created successfully.',
            ingredient: newIngredient 
        });
    } catch (error) {
        console.error('Error creating ingredient:', error);
        res.status(500).json({ message: 'Server error. Could not create ingredient.' });
    }
};

// Controller to delete an ingredient
const deleteIngredient = async (req, res) => {
    try {
        const { ingredientId } = req.params;

        if (!ingredientId) {
            return res.status(400).json({ message: 'Ingredient ID is required.' });
        }

        const deletedIngredient = await Ingredient.findByIdAndDelete(ingredientId);
        
        if (!deletedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found.' });
        }

        res.status(200).json({ message: 'Ingredient deleted successfully.' });
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        res.status(500).json({ message: 'Server error. Could not delete ingredient.' });
    }
};

// Controller to update an ingredient
const updateIngredient = async (req, res) => {
    try {
        const { ingredientId } = req.params;
        const { name, nutrition } = req.body;

        if (!ingredientId) {
            return res.status(400).json({ message: 'Ingredient ID is required.' });
        }

        // First, get the existing ingredient
        const existingIngredient = await Ingredient.findById(ingredientId);
        
        if (!existingIngredient) {
            return res.status(404).json({ message: 'Ingredient not found.' });
        }

        // Create update object with only provided fields
        const updateData = {};
        if (name) updateData.name = name;
        if (nutrition) {
            // Merge existing nutrition with new nutrition data
            updateData.nutrition = {
                ...existingIngredient.nutrition.toObject(), // Convert to plain object
                ...nutrition
            };
        }

        const updatedIngredient = await Ingredient.findByIdAndUpdate(
            ingredientId,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            message: 'Ingredient updated successfully.',
            ingredient: updatedIngredient
        });
    } catch (error) {
        console.error('Error updating ingredient:', error);
        res.status(500).json({ message: 'Server error. Could not update ingredient.' });
    }
};

const addIngredientsFreeMeal = async (req, res) => {
    const { meals } = req.body;

    if (!meals || !Array.isArray(meals)) {
        return res.status(400).json({ message: '"meals" should be an array.' });
    }

    try {
        // Map the meals array to prepare data for insertion
        const ingredients = meals.map(meal => ({
            name: meal.strIngredient,
            type: meal.strType || null, // Default to 'Unknown' if strType is null
            nutrition: {
                carbs: Math.floor(Math.random() * 100) + 1,
                fat: Math.floor(Math.random() * 100) + 1,
                protein: Math.floor(Math.random() * 100) + 1,
                calories: Math.floor(Math.random() * 100) + 1,
                fiber: Math.floor(Math.random() * 100) + 1,
                sodium: Math.floor(Math.random() * 100) + 1,
            },
        }));

        // Insert all ingredients into the database
        const insertedIngredients = await Ingredient.insertMany(ingredients);

        res.status(201).json({
            message: 'Ingredients added successfully.',
            addedCount: insertedIngredients.length,
            ingredients: insertedIngredients,
        });
    } catch (error) {
        console.error('Error adding ingredients:', error);
        res.status(500).json({
            message: 'Failed to add ingredients.',
            error: error.message,
        });
    }
};

export { createIngredient, deleteIngredient, updateIngredient, viewIngredient, addIngredientsFreeMeal }; 