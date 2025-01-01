import express from 'express';
import { getAllPosts, searchPosts, viewPost, addPost, deletePost, addPostFromFreeMeal, viewUserAllPosts } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/all", getAllPosts);
postRouter.get("/search", searchPosts);
postRouter.get("/view/:postId", viewPost);
postRouter.post("/add", addPost);
postRouter.delete("/delete/:postId", deletePost);
postRouter.post("/add/free-meal", addPostFromFreeMeal);
postRouter.get("/view-user-posts/:userId", viewUserAllPosts);

export default postRouter;