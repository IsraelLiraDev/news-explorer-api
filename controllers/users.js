const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret, jwtExpiresIn } = require('../config');
const { ConflictError, NotFoundError } = require('../errors');
const { MSG_EMAIL_CONFLICT, MSG_USER_NOT_FOUND } = require('../constants');

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => res.status(201).send({ _id: user._id, email: user.email, name: user.name }))
    .catch((err) => {
      if (err.code === 11000) return next(new ConflictError(MSG_EMAIL_CONFLICT));
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: jwtExpiresIn });
      res.send({ token });
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) throw new NotFoundError(MSG_USER_NOT_FOUND);
      res.send({ email: user.email, name: user.name });
    })
    .catch(next);
};
