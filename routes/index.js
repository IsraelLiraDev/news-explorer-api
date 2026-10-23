const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { validateSignup, validateSignin } = require('../validators');
const auth = require('../middlewares/auth');
const { searchNews } = require('../controllers/search');
const { validateSearch } = require('../validators');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { NotFoundError } = require('../errors');
const { MSG_ROUTE_NOT_FOUND } = require('../constants');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

router.get('/search', validateSearch, searchNews);

router.use(auth);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);

router.use((req, res, next) => next(new NotFoundError(MSG_ROUTE_NOT_FOUND)));

module.exports = router;
