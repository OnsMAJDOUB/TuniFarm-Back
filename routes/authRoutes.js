const express = require("express");
const { register, login, test } = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
  validator,
} = require("../middlewares/validator");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

// Test route for auth
router.get("/test", test);

// Register route with validation
router.post("/register", registerValidation(), validator, register);

// Login route with validation
router.post("/login", loginValidation(), validator, login);

// Protected route example
router.get("/current", isAuth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
