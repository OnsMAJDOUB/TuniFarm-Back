
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    method: { type: String, enum: ["organic", "conventional"], required: true },
    region: { type: String },
    addedBy: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    image: { type: String },
  },
  { timestamps: true },
  { collection: "product" }
);


module.exports = Product = mongoose.model("Product", productSchema);
