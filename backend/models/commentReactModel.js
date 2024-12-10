import mongoose from 'mongoose';

const commentReactSchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: true
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: { 
        type: String, 
        enum: ['like', 'heart', 'angry', 'sad', 'laugh'],
        required: true 
    }
}, { timestamps: true });

const CommentReact = mongoose.models.CommentReact || mongoose.model('CommentReact', commentReactSchema);
export default CommentReact;
