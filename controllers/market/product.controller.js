const Product = require("../../models/Product");
const handlePromise = require("../../utils/handlePromise.utils");
const { serverError, createSuccess } = require("../../utils/responses.utils");

const create_product = async (req, res) => {
  const body = req.body;
  const incoming = {
    title: body.title?.trim(),
    price: body.price,
    image: body.image?.trim(),
    referrerPercent: body.referrerPercent,
  };
  const product = new Product(incoming);
  const [saved, savedErr] = await handlePromise(product.save());
  if (saved) {
    createSuccess(
      res,
      saved,
      `Product with title of "${incoming.title}" created successfully`
    );
  } else {
    serverError(res, savedErr, "Could not create the product");
  }
};

module.exports = { create_product };
