import express from "express";
import {
    createIngredient,
    deleteIngredient,
    updateIngredient,
    getAllIngredientNames,
    addIngredientsFreeMeal,
} from "../controllers/ingredientController.js";

const ingredientRouter = express.Router();

ingredientRouter.post("/create", createIngredient);
ingredientRouter.delete("/delete/:ingredientId", deleteIngredient);
ingredientRouter.put("/update/:ingredientId", updateIngredient);
ingredientRouter.get("/names", getAllIngredientNames);
ingredientRouter.post("/create/free-meal", addIngredientsFreeMeal);

export default ingredientRouter;
