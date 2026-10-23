const config = require('../config');
const { MSG_SEARCH_UNAVAILABLE } = require('../constants');

const formatDate = (date) => date.toISOString().slice(0, 10);

// Busca notícias da última semana na News API (a chave fica só no servidor).
module.exports.searchNews = (req, res, next) => {
  const today = new Date();
  const from = new Date();
  from.setDate(today.getDate() - config.searchDaysRange);

  const params = new URLSearchParams({
    q: req.query.keyword,
    apiKey: config.newsApiKey || '',
    from: formatDate(from),
    to: formatDate(today),
    pageSize: config.searchPageSize,
  });

  fetch(`${config.newsApiUrl}?${params}`)
    .then((response) => {
      if (!response.ok) throw new Error(MSG_SEARCH_UNAVAILABLE);
      return response.json();
    })
    .then((data) => res.send({ articles: data.articles || [] }))
    .catch(next);
};
