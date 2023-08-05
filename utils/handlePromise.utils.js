const handlePromise = async (suppliedPromise) => {
  try {
    const data = await suppliedPromise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
};

module.exports = handlePromise;
