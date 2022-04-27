const express = require('express');
const userRouter = require('./user');
const cardRouter = require('./card');
const ErrorNotFound = require('../errors/ErrorNotFound');

const app = express();

app.use(userRouter);
app.use(cardRouter);

// обрабатываем некорректный маршрут и возвращаем ошибку
app.use('*', (req, res) => {
  res
    .status(ErrorNotFound)
    .send({ message: `Страницы по адресу ${req.baseUrl} не существует` });
});

module.exports = app;
