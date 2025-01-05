import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
    {
        startDate: {
            type: String,
            required: true,
            default: Date.now,
        },
        endDate: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        posts: {
            type: String,
        },
        type: {
            type: String,
            enum: [
                "breakfast",
                "lunch",
                "dinner",
                "snacks",
                "supper",
                "brunch",
                "other",
            ],
            default: "other",
            required: true,
        },
        ingredients: [
            {
                ingredient: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Ingredient",
                },
                weight: { type: Number },
            },
        ],
    },
    { timestamps: true },
);

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);
export default Plan;
