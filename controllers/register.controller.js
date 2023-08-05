const User = require("../models/User");
const handlePromise = require("../utils/handlePromise.utils");
const { serverError, successReq } = require("../utils/responses.utils");

const register_user = async (req, res) => {
  const body = req.body;
  const incomingUser = {
    email: body.email,
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
    password: body.password.trim(),
    phoneNumber: body.phoneNumber.trim(),
    role: "user",
    balance: 0,
  };
  bcrypt.hash(incomingUser.password, 10, (hashErr, hash) => {
    if (!hashErr) {
      const user = new User({ ...incomingUser, password: hash });
      const [saved, savedErr] = handlePromise(user.save());
      if (saved) {
        successReq(res, saved, "Registration successful");
      } else {
        serverError(res, savedErr, "Could not register user");
      }
    } else {
      serverError(res, hashErr, "Could not encrypt your password");
    }
  });
};

module.exports = { register_user };
