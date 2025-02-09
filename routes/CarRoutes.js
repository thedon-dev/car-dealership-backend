import express from "express";
import path from "path";
import multer from "multer";
import Car from "../models/Car.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

router.post("/cars", upload.single("image"), async (req, res) => {
  try {
    const newCar = new Car({
      image: req.file
        ? `https://car-dealership-backend-mhv2.onrender.com/${req.file.filename}`
        : "",
      name: req.body.name,
      status: req.body.status,
      modelYear: req.body.modelYear,
      model: req.body.model,
      power: req.body.power,
      price: req.body.price,
    });

    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/cars/:id", async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
