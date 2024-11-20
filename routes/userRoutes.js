const express = require("express");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  test,
} = require("../controllers/userController");
const isAuth = require("../middlewares/auth");

const router = express.Router();

// Test route
router.get("/test", test);

// Get all users
router.get("/", isAuth, getAllUsers);

// Get specific user details
router.get("/:id", isAuth, getUser);

// Update user details
router.put("/:id", isAuth, updateUser);

// Delete user account
router.delete("/:id", isAuth, deleteUser);

module.exports = router;
