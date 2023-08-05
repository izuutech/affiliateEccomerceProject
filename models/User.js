const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "Email already exists"],
    },
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your phone number"],
    },
    role: {
      type: String,
      required: [true, "Please enter person's role"],
    },
    balance: {
      type: Number,
      default: 0,
      required: [true, "Please enter user's initial balance"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
