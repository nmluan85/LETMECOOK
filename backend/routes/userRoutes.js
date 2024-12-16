import express from 'express';
import { createUser, loginUser, logoutUser, changePassword, deleteUser, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/userController.js";
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
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;
