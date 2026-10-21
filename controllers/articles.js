const Article = require('../models/article');
const { NotFoundError, ForbiddenError } = require('../errors');
const { MSG_ARTICLE_NOT_FOUND, MSG_FORBIDDEN, MSG_ARTICLE_DELETED } = require('../constants');

const toResponse = (article) => ({
  _id: article._id,
  keyword: article.keyword,
  title: article.title,
  text: article.text,
  date: article.date,
  source: article.source,
  link: article.link,
  image: article.image,
});

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles.map(toResponse)))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send(toResponse(article)))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) throw new NotFoundError(MSG_ARTICLE_NOT_FOUND);
      if (article.owner.toString() !== req.user._id) throw new ForbiddenError(MSG_FORBIDDEN);
      return article.deleteOne().then(() => res.send({ message: MSG_ARTICLE_DELETED }));
    })
    .catch(next);
};
