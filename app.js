require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routerErrorWay = require('./routes/errorsway');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { registerValid, loginValid } = require('./middlewares/validationJoi');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Слушаем 3000 порт
// eslint-disable-next-line no-undef
const { PORT = 3000 } = process.env;
const app = express();

// Мидлвар
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  next();
});

// app.use(cookieParser());
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.listen(PORT);
app.post('/signup', registerValid, createUser);
app.post('/signin', loginValid, login);
app.use(auth);
app.use(errorHandler);
app.use(routerErrorWay);
app.use(errors());
app.use(errorLogger); // подключаем логгер ошибок
