import express from 'express';
import { createIngredient, deleteIngredient, updateIngredient } from '../controllers/ingredientController.js';

const ingredientRouter = express.Router();

ingredientRouter.post('/create', createIngredient);
ingredientRouter.delete('/delete/:ingredientId', deleteIngredient);
ingredientRouter.put('/update/:ingredientId', updateIngredient);

export default ingredientRouter; 