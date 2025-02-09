import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import carRoutes from "./routes/CarRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", carRoutes);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Welcome to the Automobile API 🚗");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
