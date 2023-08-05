const mongoose = require("mongoose");
const Joi = require("joi");

const schema = mongoose.Schema;

const transactionSchema = schema(
  {
    product: {
      type: schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please enter product id"],
    },
    buyer: {
      type: schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter id of the buyer"],
    },
    affiliate: {
      type: schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
