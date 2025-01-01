import express from 'express';
import { getAllPosts, searchPosts, viewPost, addPost, deletePost, addPostFromFreeMeal, getPostsByCategory, setAuthorForAllPosts, resetRatingAllPosts } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/all", getAllPosts);
postRouter.get("/search", searchPosts);
postRouter.get("/view/:postId", viewPost);
postRouter.get("/category/:name", getPostsByCategory);
postRouter.post("/add", addPost);
postRouter.delete("/delete/:postId", deletePost);
postRouter.post("/add/free-meal", addPostFromFreeMeal);
postRouter.post("/reset-authors", setAuthorForAllPosts);
postRouter.post("/reset-ratings", resetRatingAllPosts);


export default postRouter;