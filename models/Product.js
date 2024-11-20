
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  method: { type: String, enum: ["organic", "conventional"], required: true },
  region: { type: String },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
