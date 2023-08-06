const express = require("express");
const userController = require("../controllers/user.controller");
const { requireAuth } = require("../middleware/auth.middleware");

const userRoute = express.Router();

/**
 * @swagger
 * /user:
 *  get:
 *      summary: fetch user
 *      tags:
 *          - user
 *      responses:
 *          200:
 *              description: User fetched successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
userRoute.get("/", requireAuth, userController.fetch_profile);

/**
 * @swagger
 * /user/fund:
 *  post:
 *      summary: Fund user
 *      tags:
 *          - user
 *      parameters:
 *          -   in: body
 *              name: amount
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the amount to be funded
 *      responses:
 *          200:
 *              description: User funded successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
userRoute.post("/fund", requireAuth, userController.fund_account);

/**
 * @swagger
 * /user/withdraw:
 *  get:
 *      summary: Withdraw all user balance
 *      tags:
 *          - user
 *      responses:
 *          200:
 *              description: User withdrew successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
userRoute.get("/withdraw", requireAuth, userController.withdrawFromWallet);

module.exports = userRoute;
