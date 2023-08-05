require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("../swaggerConfig");

const MONGO_URI = process.env.MONGO_URI;
// const MONGO_URI = process.env.LOCAL_MONGO_URI;

const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("MongoDB connected");
    if (process.env.STAGE === "development") {
      app.listen(PORT, () => console.log(`server running on ${PORT}`));
    }
  })
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  "/api-docs",
  process.env.STAGE === "development"
    ? swaggerUi.serve
    : (req, res) => successReq(res, null, "hi"),
  swaggerUi.setup(swaggerDocs)
);

//route to read a notification
/**
 * @swagger
 * /:
 *  get:
 *       description: The home route
 *       responses:
 *           '200':
 *              description: Notification content was successfully delivered to client
 */

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello", err: null, data: null });
});

module.exports = app;
