import express from "express";
import Car from "../models/Car.js";
import upload from "../middlewares/upload.js"; // Import Cloudinary upload middleware

const router = express.Router();

// Route to add a new car with image upload
router.post("/cars", upload.single("image"), async (req, res) => {
  try {
    const newCar = new Car({
      image: req.file ? req.file.path : "", // Store Cloudinary URL
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

// Route to get all cars
router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete a car
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
