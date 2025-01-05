import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

const createComment = async (req, res) => {
    try {
        const { content, rating, postId } = req.body;
        const userId = req.userId;

        const newComment = new Comment({
            user: userId,
            content,
            rating,
            post: postId,
            reactions: [],
            replies: [],
        });

        await newComment.save();

        // Optional: Update post's comments array
        await Post.findByIdAndUpdate(postId, {
            $push: { comments: newComment._id },
        });

        const populatedComment = await Comment.findById(
            newComment._id,
        ).populate("user");

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const replyComment = async (req, res) => {
    try {
        const { content, commentId } = req.body;
        const userId = req.userId;

        // Create new reply comment
        const replyComment = new Comment({
            username: userId,
            content,
            rating: 0,
            post: req.body.postId,
            reactions: [],
            replies: [],
        });

        await replyComment.save();

        await Comment.findByIdAndUpdate(commentId, {
            $push: { replies: replyComment._id },
        });

        res.status(201).json(replyComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const reactToComment = async (req, res) => {
    try {
        const { commentId, type } = req.body;
        const userId = req.userId;

        const existingReaction = await CommentReact.findOne({
            commentId,
            username: userId,
        });

        if (existingReaction) {
            existingReaction.type = type;
            await existingReaction.save();
            return res.status(200).json(existingReaction);
        }

        // Create new reaction
        const newReaction = new CommentReact({
            commentId,
            username: userId,
            type,
        });

        await newReaction.save();

        await Comment.findByIdAndUpdate(commentId, {
            $push: { reactions: newReaction._id },
        });

        res.status(201).json(newReaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.recipeId,
        }).populate("user");
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createComment, replyComment, reactToComment, getCommentsByPostId };
