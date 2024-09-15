// models/Car.js
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  id: Number,
  make: String,
  model: String,
  type: String,
  year: Number,
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
