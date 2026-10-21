const mongoose = require('mongoose');
const { isCelebrateError } = require('celebrate');
const { MSG_BAD_REQUEST, MSG_SERVER_ERROR } = require('../constants');

module.exports = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (
    isCelebrateError(err)
    || err instanceof mongoose.Error.ValidationError
    || err instanceof mongoose.Error.CastError
  ) {
    statusCode = 400;
    message = MSG_BAD_REQUEST;
  }
  if (statusCode === 500) message = MSG_SERVER_ERROR;

  res.status(statusCode).send({ message });
};
