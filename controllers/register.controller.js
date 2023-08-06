const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/User");
const handlePromise = require("../utils/handlePromise.utils");
const {
  serverError,
  successReq,
  reqError,
} = require("../utils/responses.utils");

const register_user = async (req, res) => {
  const body = req.body;
  const role = req.query.role;
  const incomingUser = {
    email: body.email?.toLowerCase()?.trim(),
    firstName: body.firstName?.trim(),
    lastName: body.lastName?.trim(),
    password: body.password?.trim(),
    phoneNumber: body.phoneNumber?.trim(),
    address: body.address?.trim(),
    state: body.state?.trim(),
    role: role === "adm" ? "admin" : "user",
    status: "active",
    balance: 0,
  };
  const validateStatus = validateUser(incomingUser);
  if (validateStatus.error) {
    console.log(
      "validateStatus.error",
      validateStatus.error.details[0].message
    );
    reqError(res, null, `${validateStatus.error.details[0].message}`);
  } else {
    const [oldUser, oldUserErr] = await handlePromise(
      User.findOne({ email: incomingUser.email })
    );
    if (oldUser) {
      reqError(res, null, "User with that email already exists.");
    } else {
      bcrypt.hash(incomingUser.password, 10, async (hashErr, hash) => {
        if (!hashErr) {
          const user = new User({ ...incomingUser, password: hash });
          const [saved, savedErr] = await handlePromise(user.save());
          if (saved) {
            successReq(res, saved, "Registration successful. Please login");
          } else {
            serverError(res, savedErr, "Could not register user");
          }
        } else {
          serverError(res, hashErr, "Could not encrypt your password");
        }
      });
    }
  }
};

module.exports = { register_user };
