const { User } = require("../models/User");
const handlePromise = require("../utils/handlePromise.utils");
const { serverError, successReq } = require("../utils/responses.utils");

const fetch_profile = async (req, res) => {
  const user = res.locals.user;
  const [fetched, fetchedErr] = await handlePromise(User.findById(user._id));
  if (fetched) {
    successReq(res, fetched, "Account fetched");
  } else {
    serverError(res, fetchedErr, "Could not fetch user");
  }
};

const fund_account = async (req, res) => {
  const amount = req.body.amount;
  const user = res.locals.user;
  const [funded, fundedErr] = await handlePromise(
    User.findByIdAndUpdate(
      user._id,
      { $inc: { balance: amount } },
      { returnDocument: "after" }
    )
  );
  if (funded) {
    successReq(res, funded, "Account credited with N" + amount);
  } else {
    serverError(res, fundedErr, "Could not fund user");
  }
};

const withdrawFromWallet = async (req, res) => {
  const user = res.locals.user;
  const [funded, fundedErr] = await handlePromise(
    User.findByIdAndUpdate(
      user._id,
      { balance: 0 },
      { returnDocument: "after" }
    )
  );
  if (funded) {
    successReq(res, funded, `N${user.balance} has been sent to your bank`);
  } else {
    serverError(res, fundedErr, "Could not fund user");
  }
};

module.exports = { fetch_profile, fund_account, withdrawFromWallet };
