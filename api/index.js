import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import signup from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
// MongoDB connection
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

const app = express();
app.use(cookieParser());
app.use(express.json());
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use("/api/user", userRoutes);
app.use("/api/auth", signup);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
