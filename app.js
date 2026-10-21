const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const routes = require('./routes');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: config.allowedOrigins }));
app.use(express.json());
app.use(requestLogger);
app.use(rateLimiter);

app.use(routes);

app.use(errorLogger);
app.use(errorHandler);

if (require.main === module) {
  mongoose.connect(config.mongoUrl)
    .then(() => app.listen(config.port, () => console.log(`API rodando na porta ${config.port}`)))
    .catch((err) => {
      console.error('Falha ao conectar no MongoDB:', err.message);
      process.exit(1);
    });
}

module.exports = app;
