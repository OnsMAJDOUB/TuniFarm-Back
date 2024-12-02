const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.test = (req, res) => {
  res.send("Test Auth OK!");
};

// register
exports.register = async (req, res) => {
  try {
    let { firstName, lastName, email, password, phone } = req.body;

    let foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(400).send({ errors: [{ msg: "Email already used" }] });
    }

    let newUser = await new User({ ...req.body });

    const salt = 10;
    let hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;

    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.SECRET_KEY
    );

    res
      .status(200)
      .send({ success: [{ msg: "Register Successfully !" }], newUser, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: [{ msg: "Can not register" }] });
  }
};

// login
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "No user found with this email address" }] });
    }

    let hashedPassword = await bcrypt.compare(password, foundUser.password);

    if (!hashedPassword) {
      return res.status(401).send({ errors: [{ msg: "Incorrect password" }] });
    }

    const token = jwt.sign(
      {
        id: foundUser._id,
      },
      process.env.SECRET_KEY
    );

    res
      .status(200)
      .send({
        success: [{ msg: `Hello ${foundUser.firstName} Welcome Back !` }],
        foundUser,
        token,
      });
  } catch (error) {
    console.error(error.message);
    res.status(400).send({ errors: [{ msg: "Can not login" }] });
  }
};
