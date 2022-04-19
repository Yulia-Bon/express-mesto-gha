const express = require('express');
const userRouter = require('./user');
const cardRouter = require('./card');
const { ERROR_CODE_NOT_FOUND } = require('../errors/error_code');

const app = express();

app.use(userRouter);
app.use(cardRouter);

// обрабатываем некорректный маршрут и возвращаем ошибку
app.use('*', (req, res) => {
  res
    .status(ERROR_CODE_NOT_FOUND)
    .send({ message: `Страницы ${req.baseUrl} не найдена` });
});

module.exports = app;
