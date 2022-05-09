const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const helmet = require('helmet');

const cors = require('cors');
// const routes = require('./routes/errorsway');

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
app.use(cookieParser());
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

// Мидлвары
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://mesto-express.ybon.nomoredomains.work/');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') {
    res.send(200);
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // подключаем логгер запросов

app.use('*', cors(options));
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', registerValid, createUser);
app.post('/signin', loginValid, login);

app.use(auth);

app.use(errorLogger); // подключаем логгер ошибок

app.use(routerErrorWay);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
