
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Not authorized: token not found" }] });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const foundUser = await User.findOne({ _id: decoded.id });

    if (!foundUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Not authorized: user not found" }] });
    }

    req.user = foundUser;
    next();
  } catch (error) {
    return res
      .status(400)
      .send({ errors: [{ msg: "Not authorized: invalid token" }] });
  }
};

module.exports = isAuth;
