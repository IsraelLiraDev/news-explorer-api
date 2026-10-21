const HttpError = require('./HttpError');

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(401, message);
  }
}

module.exports = UnauthorizedError;
