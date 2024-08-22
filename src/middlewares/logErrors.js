const logger = require('../configs/logger')

const logErrors = (err, req, res, next) => {
    logger.error(`${err.name}: ${err.message}`, {
        method: req.method,
        url: req.url,
        body: req.body,
        stack: err.stack
    });
    next(err);
}

module.exports = logErrors

