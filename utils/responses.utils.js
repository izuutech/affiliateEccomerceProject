const successReq = (res, data, customMessage) => {
  res.status(200).json({
    message: customMessage ? customMessage : `Your request was successful`,
    error: null,
    data: data ? data : null,
  });
};

const serverError = (res, errorData, customMessage) => {
  res.status(500).json({
    message: null,
    error: customMessage ? customMessage : `An unknown error occured`,
    data: errorData ? errorData : null,
  });
};

module.exports = { successReq, serverError };
