const router = require('express').Router();
const userRoute = require('./user');
const cardsRoute = require('./card');
const ErrorNotFound = require('../controllers/errors/ErrorNotFound');

router.use(userRoute);
router.use(cardsRoute);

// обрабатываем некорректный маршрут и возвращаем ошибку
router.use((req, res, next) => {
  next(new ErrorNotFound('Данный путь не найден'));
});

module.exports = router;
