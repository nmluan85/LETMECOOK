import express from "express";
import {
    createUser,
    loginUser,
    logoutUser,
    changePassword,
    deleteUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getAllUsers,
    checkAuth,
    savePostToUser,
    deleteSavedPost,
    getSavedPosts,
    changeRole,
    getPersonalPosts,
    editProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = express.Router();

userRouter.get("/check-auth", verifyToken, checkAuth);
userRouter.post("/create", createUser);
userRouter.post("/verify", verifyEmail);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.put("/change-password", changePassword);
userRouter.get("/all-users", getAllUsers);
userRouter.delete("/delete/:id", deleteUser);
userRouter.post("/save-post", verifyToken, savePostToUser);
userRouter.delete("/save-post", verifyToken, deleteSavedPost);
userRouter.get("/save-post", verifyToken, getSavedPosts);
userRouter.put("/change-role", verifyToken, changeRole);
userRouter.get("/personal-post", verifyToken, getPersonalPosts);
userRouter.put("/edit-profile", verifyToken, editProfile);

export default userRouter;
