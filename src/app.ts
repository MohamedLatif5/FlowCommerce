import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
const app = express();
const PORT = 3000;
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection failed", err);
  });

app.use("/user", userRoute);
app.use("/products", productRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
