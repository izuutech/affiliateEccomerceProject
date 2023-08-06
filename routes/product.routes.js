const express = require("express");
const productController = require("../controllers/market/product.controller");
const { requireAdmin, requireAuth } = require("../middleware/auth.middleware");

const productRoute = express.Router();

/**
 * @swagger
 * /product:
 *  get:
 *      summary: Fetch all products
 *      tags:
 *          - product
 *      parameters:
 *          -   in: query
 *              name: page
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the page to be fetched
 *          -   in: limit
 *              name: price
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the limit of the number of products to be fetched
 *      responses:
 *          200:
 *              description: Products fetched successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
productRoute.get("/", requireAuth, productController.fetch_all_products);

/**
 * @swagger
 * /product:
 *  post:
 *      summary: Create product
 *      tags:
 *          - product
 *      parameters:
 *          -   in: body
 *              name: title
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the name/title of the product
 *          -   in: body
 *              name: price
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the price of the product
 *          -   in: body
 *              name: summary
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the product's summary
 *          -   in: body
 *              name: description
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the product's description
 *          -   in: body
 *              name: image
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the product's image
 *          -   in: body
 *              name: referrerPercent
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the percent of the price to be given to the referrer after purchase
 *      responses:
 *          200:
 *              description: Product created successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
productRoute.post("/", requireAdmin, productController.create_product);

/**
 * @swagger
 * /product/{id}:
 *  get:
 *      summary: Fetch single product
 *      tags:
 *          - product
 *      parameters:
 *          -   in: params
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the id of the product
 *      responses:
 *          200:
 *              description: Product fetched successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
productRoute.get("/:id", requireAuth, productController.fetch_single_product);

module.exports = productRoute;
