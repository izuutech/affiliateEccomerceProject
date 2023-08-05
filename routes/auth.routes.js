const express = require("express");
const registerController = require("../controllers/register.controller");
const loginController = require("../controllers/login.controller");

const registerRoute = express.Router();

//route for registering user
/**
 * @swagger
 * /register:
 *  post:
 *      summary: Register  user
 *      tags:
 *          - auth
 *      parameters:
 *          -   in: body
 *              name: email
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the person's email
 *          -   in: body
 *              name: firstName
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the person's first name
 *          -   in: body
 *              name: lastName
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the person's last name
 *          -   in: body
 *              name: password
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the person's password
 *          -   in: body
 *              name: phoneNumber
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the user's phone number
 *      responses:
 *          200:
 *              description: User registered successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
registerRoute.post("/register", registerController.register_user);

/**
 * @swagger
 * /login:
 *  post:
 *      summary: Login user
 *      tags:
 *          - auth
 *      parameters:
 *          -   in: body
 *              name: email
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the person's email
 *          -   in: body
 *              name: password
 *              required: true
 *              schema:
 *                  type: string
 *              description: This is the person's password
 *      responses:
 *          200:
 *              description: User logged in successfully
 *          400:
 *              description: Bad request format
 *          500:
 *              description: An operation failed.
 */
registerRoute.post("/login", loginController.login_user);

module.exports = registerRoute;
