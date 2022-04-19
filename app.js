const express = require('express');
const mongoose = require('mongoose');
//const path = require('path');
//const bodyParser = require('body-parser');
 const usersRouter = require('./routes/user');
 //const cardsRouter = require('./routes/cards');
// Слушаем 3000 порт
// eslint-disable-next-line no-undef
const { PORT = 3000 } = process.env;
const app = express();
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// миделвеа
app.use((req, res, next) => {
  console.log(req.method, req.path);

  next();
});

app.use(express.json());
// app.use(routes);
app.use(usersRouter);


async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (error) {
    console.log(error);
  }

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`); // Если всё работает, консоль покажет, какой порт приложение слушает
  });
}

// запросы
app.get('/', (req, res) => {res.send('Hello word!!!!');
});

app.post('/', (req, res) => {
  res.send(req.body);
});

main();

// Временное решение для авторизаци
app.use((req, res, next) => {
  req.user = {
    _id: '625edd230f91a3a3aeb41a5d',
  };

  next();
});



/*
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
*/

/*
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
*/
