import express from "express";
import {
    createComment,
    replyComment,
    reactToComment,
    getCommentsByPostId,
} from "../controllers/commentController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/post/:recipeId", getCommentsByPostId);
router.post("/create", verifyToken, createComment);
router.post("/reply", verifyToken, replyComment);
router.post("/react", verifyToken, reactToComment);

export default router;
