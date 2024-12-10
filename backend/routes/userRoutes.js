import express from 'express';
import { createUser, loginUser, logoutUser, changePassword, deleteUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.put("/change-password", changePassword);
userRouter.delete("/delete/:id", deleteUser);

export default userRouter;