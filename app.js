const express = require('express');
const mongoose = require('mongoose');

// const routes = require('./routes/errorsway');

const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const routerErrorWay = require('./routes/errorsway');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { registerValid, loginValid } = require('./middlewares/validationJoi');
const { requestLogger, errorLoger } = require('./middlewares/logger');
// Слушаем 3000 порт
// eslint-disable-next-line no-undef
const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', registerValid, createUser);
app.post('/signin', loginValid, login);

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true });

app.use('/card', require('./routes/card'));

app.use(errorLoger);

app.use(auth);

app.use(routerErrorWay);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
