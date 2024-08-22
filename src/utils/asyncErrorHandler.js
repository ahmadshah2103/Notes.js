const logger = require("../configs/logger");

const asyncErrorHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(error => {
    logger.error(error.stack);
    next(error);
  });

module.exports = asyncErrorHandler;