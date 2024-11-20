
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    status: { type: String, default: "pending" },
  consumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  deliveryMethod: {
    type: String,
    enum: ["pickup", "delivery"],
    required: true,
  },
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Order", orderSchema);
