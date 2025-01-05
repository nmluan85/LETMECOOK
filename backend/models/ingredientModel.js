import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        nutrition: {
            carbs: Number,
            fat: Number,
            protein: Number,
            calories: Number,
            fiber: Number,
            sodium: Number,
        },
        type: {
            type: String,
        },
    },
    { timestamps: true },
);

const Ingredient =
    mongoose.models.Ingredient ||
    mongoose.model("Ingredient", ingredientSchema);
export default Ingredient;
