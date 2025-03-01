import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import planRouter from "./routes/planRoutes.js";
import ingredientRouter from "./routes/ingredientRoutes.js";
import commentRouter from "./routes/commentRoutes.js";

dotenv.config();

// App Config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// Middlewares
app.use(
    cors({
        origin: "http://localhost:5173", // Frontend origin
        credentials: true, // Allow cookies and credentials
    }),
);
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// Serve static files from the "uploads" directory
// This lets you access images via URLs, e.g. http://localhost:3000/uploads/filename.jpg
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/plans", planRouter);
app.use("/api/ingredients", ingredientRouter);
app.use("/api/comments", commentRouter);

app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
