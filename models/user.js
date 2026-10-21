const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { UnauthorizedError } = require('../errors');
const { MSG_WRONG_CREDENTIALS, MSG_INVALID_EMAIL } = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: { validator: (v) => validator.isEmail(v), message: MSG_INVALID_EMAIL },
  },
  password: { type: String, required: true, select: false },
  name: {
    type: String, required: true, minlength: 2, maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) return Promise.reject(new UnauthorizedError(MSG_WRONG_CREDENTIALS));
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) return Promise.reject(new UnauthorizedError(MSG_WRONG_CREDENTIALS));
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
