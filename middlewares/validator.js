const { check, validationResult } = require("express-validator");

// Register validation middleware
exports.registerValidation = () => [
  check("firstName", "This field cannot be empty.").notEmpty().escape(),
  check("lastName", "This field cannot be empty.").notEmpty().escape(),
  check("email", "This field cannot be empty.").notEmpty().escape(),
  check("email", "Incorrect type.").isEmail().normalizeEmail(),
  check("password", "This field should be at least 6 characters long.")
    .isLength({ min: 6, max: 15 })
    .escape(),
  check("phone", "This field cannot be empty.").notEmpty().escape(),
];

// Login validation middleware
exports.loginValidation = () => [
  check("email", "This field cannot be empty.").notEmpty().escape(),
  check("email", "Incorrect type.").isEmail().normalizeEmail(),
  check("password", "This field cannot be empty.").notEmpty().escape(),
];

// Validator function to handle errors
exports.validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
