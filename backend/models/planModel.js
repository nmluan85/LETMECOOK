import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
    date: {
        type: String, 
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    ingredients: [{
        ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
        weight: { type: Number },
    }]
}, { timestamps: true });

const Plan = mongoose.models.Plan || mongoose.model('Plan', planSchema);
export default Plan;