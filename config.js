require('dotenv').config({ quiet: true });

const {
  NODE_ENV, JWT_SECRET, MONGO_URL, PORT, ALLOWED_ORIGINS,
} = process.env;

const isProduction = NODE_ENV === 'production';

module.exports = {
  isProduction,
  port: PORT || 3000,
  mongoUrl: MONGO_URL || 'mongodb://127.0.0.1:27017/news-explorer-db',
  jwtSecret: isProduction && JWT_SECRET ? JWT_SECRET : 'dev-secret-nao-usar-em-producao',
  jwtExpiresIn: '7d',
  allowedOrigins: isProduction && ALLOWED_ORIGINS
    ? ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:5173', 'http://localhost:3001'],
};
