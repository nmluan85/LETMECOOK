import express from 'express';
import { searchPosts, viewPost, addPost, deletePost } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/search", searchPosts);
postRouter.get("/view/:postId", viewPost);
postRouter.post("/add", addPost);
postRouter.delete("/delete/:postId", deletePost);

export default postRouter;