
const Order = require("../models/Order");
// Test route
exports.test = (req, res) => {
  res.send("Test order OK!");
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { items, total, deliveryMethod } = req.body;
  try {
    const order = new Order({
      consumer: req.user.id,
      items,
      total,
      deliveryMethod,
    });
    await order.save();
    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error });
  }
};

// Get all orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ consumer: req.user.id }).populate(
      "items.product",
      "name price"
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(400).json({ message: "Error updating order status", error });
  }
};
