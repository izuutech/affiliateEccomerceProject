const Product = require("../../models/Product");
const Transaction = require("../../models/Transaction");
const { User } = require("../../models/User");
const handlePromise = require("../../utils/handlePromise.utils");
const {
  notFound,
  serverError,
  successReq,
  reqError,
} = require("../../utils/responses.utils");

const change_transaction_status = async (req, res) => {
  const status = req?.query?.status;
  const [changed, changedErr] = await handlePromise(
    Transaction.findByIdAndUpdate(
      req?.params?.id,
      { status },
      { returnDocument: "after" }
    )
  );
  if (changed) {
    successReq(res, changed, "Transaction status changed to " + status);
  } else {
    console.log(status, changedErr);
    serverError(res, changedErr, "Could not change transaction status");
  }
};

const change_transaction_balance = async ({
  res,
  transaction,
  debitedBuyer,
}) => {
  const [marked, markedErr] = await handlePromise(
    Transaction.findByIdAndUpdate(
      transaction._id,
      { status: "pending", buyerBalanceAfter: debitedBuyer.balance },
      { returnDocument: "after" }
    )
  );
  if (marked) {
    successReq(
      res,
      marked,
      "Purchase successful. Product will be shipped to your location in 8 days"
    );
  } else {
    serverError(res, markedErr, "Could not mark transaction as complete");
  }
};

const create_transaction = async ({ res, product, buyer, affiliate }) => {
  const transObj = affiliate
    ? {
        product: product._id,
        amount: product.price,
        buyer: buyer._id,
        status: "pending",
        buyerBalanceBefore: buyer.balance,
        buyerBalanceAfter: buyer.balance,
        affiliate: affiliate._id,
        type: "order",
      }
    : {
        product: product._id,
        amount: product.price,
        status: "pending",
        buyer: buyer._id,
        buyerBalanceBefore: buyer.balance,
        buyerBalanceAfter: buyer.balance,
        type: "order",
      };
  const transaction = new Transaction(transObj);
  const [saveTransaction, saveTransactionErr] = await handlePromise(
    transaction.save()
  );
  if (saveTransaction) {
    const [debitUser, debitUserErr] = await handlePromise(
      User.findByIdAndUpdate(
        buyer._id,
        { $inc: { balance: -product.price } },
        { returnDocument: "after" }
      )
    );
    if (debitUser) {
      if (affiliate) {
        const profit = (product.price * product.referrerPercent) / 100;
        const [fundAffiliate, fundAffiliateErr] = await handlePromise(
          User.findByIdAndUpdate(
            affiliate._id,
            { $inc: { balance: profit } },
            { returnDocument: "after" }
          )
        );
        if (fundAffiliate) {
          change_transaction_balance({
            res,
            transaction: saveTransaction,
            debitedBuyer: debitUser,
          });
        } else {
          serverError(res, fundAffiliateErr, "Could not fund your affiliate");
        }
      } else {
        change_transaction_balance({
          res,
          transaction: saveTransaction,
          debitedBuyer: debitUser,
        });
      }
    } else {
      serverError(res, debitUserErr, "Could not debit user");
    }
  } else {
    serverError(res, saveTransactionErr, "Could not create transaction");
  }
};

const purchase_product = async (req, res) => {
  const id = req.params.id;
  const referrer = req.query.ref;
  const loggedInUser = res.locals.user;
  const [product, productErr] = await handlePromise(Product.findById(id));
  if (product && product.price <= loggedInUser.balance) {
    const [affiliate, affiliateErr] = await handlePromise(
      User.findById(referrer)
    );
    if (affiliate && affiliate._id.toString() !== loggedInUser._id.toString()) {
      create_transaction({ res, product, buyer: loggedInUser, affiliate });
    } else {
      create_transaction({ res, product, buyer: loggedInUser });
    }
  } else if (product && product.price > loggedInUser.balance) {
    reqError(
      res,
      null,
      "You do not have sufficient balance to purchase this product"
    );
  } else {
    notFound(res, productErr, "Could not fetch product");
  }
};

module.exports = { change_transaction_status, purchase_product };
