const errorHandlerMiddleware = (err, req, res) => {
  return res
    .status(500)
    .json({
      msg: err,
      stack: process.env === "development" ? err.stack : null,
    });
};

module.exports = errorHandlerMiddleware;
