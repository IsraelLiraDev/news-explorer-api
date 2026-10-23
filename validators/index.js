const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { MSG_INVALID_URL } = require('../constants');

const urlRule = Joi.string().custom((value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.message(MSG_INVALID_URL);
});

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: urlRule.required(),
    image: urlRule.required(),
  }),
});

module.exports.validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateSearch = celebrate({
  query: Joi.object().keys({
    keyword: Joi.string().trim().required().min(1)
      .max(100),
  }),
});
