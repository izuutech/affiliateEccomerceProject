const mongoose = require("mongoose");
const Joi = require("joi");

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
    address: {
      type: String,
      required: [true, "Please enter your shipping address"],
    },
    state: {
      type: String,
    },
    role: {
      type: String,
      required: [true, "Please enter person's role"],
    },
    status: {
      type: String,
      required: [true, "Please enter person's status"], //active, suspended
    },
    balance: {
      type: Number,
      default: 0,
      required: [true, "Please enter user's initial balance"],
    },
  },
  { timestamps: true }
);

const validateUser = (person) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .min(5)
      .max(500)
      .required()
      .label("Email"),
    firstName: Joi.string().min(2).required().label("First name"),
    lastName: Joi.string().min(2).required().label("Last name"),
    phoneNumber: Joi.string().required().label("Phone number"),
    state: Joi.string().label("State"),
    address: Joi.string().label("Address"),
    role: Joi.string().valid("user", "admin").required().label("Role"),
    status: Joi.string()
      .valid("active", "suspended")
      .required()
      .label("Status"),
    password: Joi.string().min(8).required().label("Password"),
    balance: Joi.number().required().label("Balance"),
  });

  return schema.validate(person);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validateUser };
