const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { UnauthorizedError } = require('../errors');
const { MSG_UNAUTHORIZED } = require('../constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(MSG_UNAUTHORIZED));
  }
  try {
    req.user = jwt.verify(authorization.replace('Bearer ', ''), jwtSecret);
  } catch (err) {
    return next(new UnauthorizedError(MSG_UNAUTHORIZED));
  }
  return next();
};
