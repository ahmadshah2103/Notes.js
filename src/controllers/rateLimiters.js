const rateLimit = require('express-rate-limit');

const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {message: 'Too many requests from this IP, please try again later.'},
});

const notesRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {message: 'Too many requests from this IP, please try again later.'},
});

module.exports = { authRateLimiter, notesRateLimiter };