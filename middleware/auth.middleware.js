const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authError } = require("../utils/responses.utils");
const handlePromise = require("../utils/handlePromise.utils");

const requireAuth = (req, res, next) => {
  // const token = req.cookies.jwt;
  const bearer = req.headers.authorization;
  const bearerToken = bearer?.split(" ");
  const token = bearerToken ? bearerToken[1] : "invalid";
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
      if (err) {
        authError(res, err, "Invalid token");
      } else {
        let [person, personErr] = await handlePromise(
          User.findById(decodedToken.id)
        );
        if (person && person.status === "active") {
          res.locals.user = {
            id: person._id,
            email: person.email,
            role: person.role,
            status: person.status,
            vendor: person.vendor,
            balance: person.balance,
            isPrivate: person.isPrivate,
          };

          next();
        } else if (person && person.status === "suspended") {
          authError(
            res,
            personErr,
            "You can't perform this action because you were suspended"
          );
        } else {
          authError(
            res,
            personErr,
            "Not authorized to access content. Please login"
          );
        }
      }
    });
  } else {
    authError(res, { url: "/login" }, "Please login");
  }
};

const requireAdmin = (req, res, next) => {
  // const token = req.cookies.admintoken;
  const bearer = req.headers.authorization;
  const bearerToken = bearer?.split(" ");
  const token = bearerToken ? bearerToken[1] : "invalid";

  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, decodedToken) => {
      if (err) {
        authError(res, err, "Invalid token");
      } else {
        const [person, personErr] = await handlePromise(
          User.findById(decodedToken.id)
        );

        if (person && person.status === "active" && person.role === "admin") {
          res.locals.user = {
            id: person._id,
            email: person.email,
            role: person.role,
            status: person.status,
            balance: person.balance,
            isPrivate: person.isPrivate,
          };

          next();
        } else {
          authError(
            res,
            personErr,
            "Not authorized to access content. Please login"
          );
        }
      }
    });
  } else {
    authError(res, { url: "/login" }, "Please login");
  }
};

module.exports = {
  requireAuth,
  requireAdmin,
};
