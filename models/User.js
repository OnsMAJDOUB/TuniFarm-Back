const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: Number,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
  { collection: "users" }
);

module.exports = User = mongoose.model("User", userSchema);
