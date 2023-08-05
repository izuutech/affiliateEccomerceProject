const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    amount: {
      type: Number,
      required: [true, "Please enter amount of purchase"],
    },
    buyerBalanceBefore: {
      type: Number,
      required: [true, "Please enter balance of the buyer before debit"],
    },
    buyerBalanceAfter: {
      type: Number,
      required: [true, "Please enter balance of the buyer after transaction"],
    },
    status: {
      type: String,
      required: [true, "Please enter transaction status"], //pending,failed,approved
    },
    affiliate: {
      type: schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

transactionSchema.plugin(mongoosePaginate);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
