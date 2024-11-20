const express = require("express");
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  test,
} = require("../controllers/productController");
const isAuth = require("../middlewares/auth");

const router = express.Router();

// Test route
router.get("/test", test);

// Create a new product
router.post("/", isAuth, createProduct);

// Get all products
router.get("/", getProducts);

// Update a product
router.put("/:id", isAuth, updateProduct);

// Delete a product
router.delete("/:id", isAuth, deleteProduct);

module.exports = router;
