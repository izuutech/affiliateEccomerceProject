const Product = require("../../models/Product");
const handlePromise = require("../../utils/handlePromise.utils");
const {
  serverError,
  createSuccess,
  successReq,
} = require("../../utils/responses.utils");

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

const fetch_all_products = async (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 1;
  const [products, productsErr] = await handlePromise(
    Product.paginate(
      {},
      {
        page,
        limit,
        collation: {
          locale: "en",
        },
      }
    )
  );
  if (products) {
    successReq(res, products, "Products fetched successfully");
  } else {
    serverError(res, productsErr, "Error fetching products");
  }
};

const fetch_single_product = async (req, res) => {
  const id = req.params.id;
  const [product, productErr] = await handlePromise(Product.findById(id));
  if (product) {
    successReq(res, product, "Product fetched successfully");
  } else {
    serverError(res, productErr, "Error fetching product");
  }
};

module.exports = { create_product, fetch_all_products, fetch_single_product };
