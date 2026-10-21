const rateLimit = require('express-rate-limit');
const { MSG_TOO_MANY_REQUESTS } = require('../constants');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: MSG_TOO_MANY_REQUESTS },
});
