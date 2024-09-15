import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import signup from "./routes/auth.route.js";

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
app.use(express.json());
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.use("/api/user", userRoutes);
app.use("/api/auth", signup);
