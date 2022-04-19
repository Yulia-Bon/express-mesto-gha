const express = require('express');
const userRouter = require('./user');
const cardRouter = require('./card');
const {ERROR_CODE_NOT_FOUND} = require('../constants');

const app = express();

app.use(userRouter);
app.use(cardRouter);

// Обработаем некорректный маршрут и вернём ошибку 404
app.use('*', (req, res) => {
  res
    .status(ERROR_CODE_NOT_FOUND)
    .send({message: `Страницы ${req.baseUrl} не найдена`});
});

module.exports = app;