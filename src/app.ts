import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();
const PORT = 3000; // Port number
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
