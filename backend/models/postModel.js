import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    uploadDate: { 
        type: Date, 
        default: Date.now 
    },
    title: { 
        type: String, 
        required: true },
    content: { 
        type: String, 
        required: true 
    },
    tags: {
        type: [String]
    },
    photo: {
        type: String 
    },
    duration: {
        type: Number
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            content: {
                type: String,
                required: true,
                trim: true,
            },
            rating: { 
                type: Number,
                required: true,
                min: 0,
                max: 5
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    ingredients: [{
        ingredient: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' },
        weight: { type: Number },
    }],
}, { timestamps: true });
 
const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export default Post;