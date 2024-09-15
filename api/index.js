import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

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

const port = 3000;

// Start the server and log the port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
