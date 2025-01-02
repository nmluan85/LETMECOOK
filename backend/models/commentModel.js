import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: { 
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    reactions: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CommentReact' 
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
export default Comment;