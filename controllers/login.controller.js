const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const handlePromise = require("../utils/handlePromise.utils");
const {
  authError,
  serverError,
  reqError,
} = require("../utils/responses.utils");

const createToken = async (id) => {
  return jwt.sign({ id: id }, process.env.JWT_KEY, {
    expiresIn: "3h",
  });
};

const login_user = async (req, res) => {
  const body = req.body;
  const [user, userErr] = await handlePromise(
    User.findOne({ email: body.email.toLowerCase() })
  );
  if (user) {
    bcrypt.compare(body.password, user.password, async function (err, result) {
      if (result == true) {
        //login function here
        const token = await createToken(user._id);
        const maxAge = 3 * 60 * 60; //3hrs
        if (user.status === "active") {
          if (user.role === "user") {
            res
              .status(200)
              .cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
              })
              .json({
                message: "User logged in",
                error: null,
                data: {
                  type: user.role,
                  userToken: token,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  id: user._id,
                },
              });
          } else if (user.role === "admin") {
            res
              .status(200)
              .cookie("admintoken", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
              })
              .cookie("jwt", token, {
                httpOnly: true,
                maxAge: maxAge * 1000,
              })
              .json({
                message: "Admin logged in",
                error: null,
                data: {
                  type: user.role,
                  userToken: token,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  id: user._id,
                },
              });
          }
        } else {
          authError(
            res,
            userErr,
            "You cannot login because you were suspended. Please contact support."
          );
        }
      } else {
        reqError(res, err, "Password is incorrect");
      }
    });
  } else {
    reqError(res, userErr, "Email does not exist");
  }
};

const destroyToken = async (id) => {
  return jwt.sign({ id: id }, process.env.JWT_KEY, {
    expiresIn: "1s",
  });
};

const logout_get = async (req, res) => {
  const [token, tokenErr] = await handlePromise(destroyToken(null));
  if (token) {
    res
      .status(200)
      .cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000,
      })
      .json({ message: "User logged out", error: null, data: null });
  } else {
    serverError(res, tokenErr);
  }
};

const admin_logout_get = async (req, res) => {
  const [token, tokenErr] = await handlePromise(destroyToken(null));
  if (token) {
    res
      .status(200)
      .cookie("admintoken", token, {
        httpOnly: true,
        maxAge: 1000,
      })
      .json({ message: "User logged out", error: null, data: null });
  } else {
    serverError(res, tokenErr);
  }
};

module.exports = { login_user, logout_get, admin_logout_get };
