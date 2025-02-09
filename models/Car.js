import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    modelYear: { type: Number, required: true },
    model: { type: String, required: true },
    power: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", CarSchema);
export default Car;
