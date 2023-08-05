const Transaction = require("../../models/Transaction");
const handlePromise = require("../../utils/handlePromise.utils");
const { serverError, successReq } = require("../../utils/responses.utils");

const fetch_all_orders = async (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 10;
  const [orders, ordersErr] = await handlePromise(
    Transaction.paginate(
      {},
      {
        page,
        limit,
        collation: {
          locale: "en",
        },
      }
    )
  );
  if (orders) {
    successReq(res, orders, "Orders fetched successfully");
  } else {
    serverError(res, ordersErr, "Could not fetch orders");
  }
};

module.exports = { fetch_all_orders };
