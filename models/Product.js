const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const schema = mongoose.Schema;

const productSchema = schema(
  {
    title: {
      type: String,
      required: [true, "Please enter product name"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price of product"],
    },
    image: {
      type: String,
      required: [true, "Please enter image link"],
    },
    referrerPercent: {
      type: Number,
      required: [
        true,
        "Please enter percent for when a user refers the product to someone else",
      ],
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
