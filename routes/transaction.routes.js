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
 *          -   in: query
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
 * /t/status/{id}:
 *  put:
 *      summary: Change transaction status
 *      tags:
 *          - transaction
 *      parameters:
 *          -   in: params
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the id of the transaction
 *          -   in: query
 *              name: status
 *              required: false
 *              schema:
 *                  type: string
 *              description: This is the new status of the transaction
 *      responses:
 *          200:
 *              description: Transaction changed successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
transactionRoute.put(
  "/status/:id",
  requireAuth,
  transactionController.change_transaction_status
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
