const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  // Check if the response object is defined
  if (!res) {
    return next(err);
  }
  return res.status(500).json({ msg: "Something went wrong" });
};

module.exports = errorMiddleware;









// const errorHandlerMiddleware = (err, req, res) => {
//   return res
//     .status(500)
//     .json({
//       msg: err,
//       stack: process.env === "development" ? err.stack : null,
//     });
// };

// module.exports = errorHandlerMiddleware;
