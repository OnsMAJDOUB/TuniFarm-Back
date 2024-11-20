const express = require("express");
const { register, login, test } = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
  validator,
} = require("../middlewares/validator");
const isAuth = require("../middlewares/auth");

const router = express.Router();

// Test route for auth
router.get("/test", test);

// Register route with validation
router.post("/register", registerValidation(), validator, register);

// Login route with validation
router.post("/login", loginValidation(), validator, login);

// Protected route example
router.get("/profile", isAuth, (req, res) => {
  res
    .status(200)
    .send({ message: `Welcome, ${req.user.firstName}!`, user: req.user });
});

module.exports = router;
