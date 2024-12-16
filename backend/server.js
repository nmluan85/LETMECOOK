import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import planRouter from "./routes/planRoutes.js";
import ingredientRouter from "./routes/ingredientRoutes.js";

dotenv.config();

// App Config
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/plans", planRouter);
app.use("/api/ingredients", ingredientRouter);

app.get("/", (req, res) => {
    res.json({ message: "API is running..." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

