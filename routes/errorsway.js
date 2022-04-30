const router = require('express').Router();
const userRoute = require('./user');
const cardsRoute = require('./card');
const ErrorNotFound = require('../errors/ErrorNotFound');

router.use('/user', userRoute);
router.use('/card', cardsRoute);

// обрабатываем некорректный маршрут и возвращаем ошибку
router.use((req, res, next) => {
  next(new ErrorNotFound({ message: 'Данный путь не найден' }));
});

module.exports = router;
