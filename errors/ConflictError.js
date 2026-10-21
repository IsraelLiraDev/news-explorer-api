const HttpError = require('./HttpError');

class ConflictError extends HttpError {
  constructor(message) {
    super(409, message);
  }
}

module.exports = ConflictError;
