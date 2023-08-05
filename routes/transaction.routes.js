const express = require("express");
const transactionController = require("../controllers/market/transaction.controller");
const { requireAuth } = require("../middleware/auth.middleware");
const ordersController = require("../controllers/market/orders.controller");

const transactionRoute = express.Router();

/**
 * @swagger
 * /t/purchase/{id}:
 *  get:
 *      summary: Purchase item
 *      tags:
 *          - transaction
 *      parameters:
 *          -   in: params
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the id of the product
 *          -   in: params
 *              name: ref
 *              required: false
 *              schema:
 *                  type: string
 *              description: This is the id of the referral recommending the product
 *      responses:
 *          200:
 *              description: Product purchased successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
transactionRoute.get(
  "/purchase/:id",
  requireAuth,
  transactionController.purchase_product
);

/**
 * @swagger
 * /t/orders:
 *  get:
 *      summary: Fetch users orders
 *      tags:
 *          - transaction
 *      responses:
 *          200:
 *              description: Orders fetched successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
transactionRoute.get("/orders", requireAuth, ordersController.fetch_all_orders);

module.exports = transactionRoute;
