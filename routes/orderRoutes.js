const express = require("express");
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  test,
} = require("../controllers/orderController");
const isAuth = require("../middlewares/auth"); 

const router = express.Router();
// Test route 
router.get("/test", test);

// Create a new order 
router.post("/", isAuth, createOrder);

// Get all orders for the authenticated user
router.get("/", isAuth, getUserOrders);

// Update order status 
router.put("/:id/status", isAuth, updateOrderStatus);

module.exports = router;
