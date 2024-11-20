
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Test route
exports.test = (req, res) => {
  res.send("Test Auth OK!");
};

// Register
exports.register = async (req, res) => {
  try {
    let { firstName, lastName, email, password, phone } = req.body;

    // Check if user with the email already exists
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).send({ errors: [{ msg: "Email already used" }] });
    }

    // Create a new user with the request body data
    let newUser = new User({ ...req.body });

    // Hash the password
    const salt = 10;
    let hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;

    // Save new user to database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY
    );

    res
      .status(200)
      .send({ success: [{ msg: "Register Successfully!" }], newUser, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: [{ msg: "Cannot register" }] });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Check if user with the email exists
    let foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "No user found with this email address" }] });
    }

    // Compare passwords
    let isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({ errors: [{ msg: "Incorrect password" }] });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.SECRET_KEY
    );

    res
      .status(200)
      .send({
        success: [{ msg: `Hello ${foundUser.firstName}, welcome back!` }],
        foundUser,
        token,
      });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ errors: [{ msg: "Cannot login" }] });
  }
};
