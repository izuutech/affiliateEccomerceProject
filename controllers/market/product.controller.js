const cloudinary = require("cloudinary");
const Product = require("../../models/Product");
const handlePromise = require("../../utils/handlePromise.utils");
const {
  serverError,
  createSuccess,
  successReq,
  reqError,
} = require("../../utils/responses.utils");

cloudinary.config({
  //adindu keys
  cloud_name: "dyx2e9ox4",
  api_key: "348882827666355",
  api_secret: "Q-wYSL5K2j0J3bLWGMgU5mTzTuE",
});

const create_product = async (req, res) => {
  const body = req.body;
  const image = req.file;
  if (image) {
    cloudinary.v2.uploader.upload(
      req.file.path,
      { public_id: req.file.filename },
      async function (error, result) {
        if (error) {
          reqError(res, error, "Could not upload image");
        } else {
          const incoming = {
            title: body.title?.trim(),
            summary: body.summary?.trim(),
            description: body.description?.trim(),
            price: body.price,
            image: result.secure_url,
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
        }
      }
    );
  } else {
    reqError(res, null, "Product image is required");
  }
};

const fetch_all_products = async (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  const [products, productsErr] = await handlePromise(
    Product.paginate(
      {},
      {
        page,
        limit,
        collation: {
          locale: "en",
        },
        sort: { createdAt: -1 },
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
