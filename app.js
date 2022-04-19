const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/errorsway');

// Слушаем 3000 порт
// eslint-disable-next-line no-undef
const { PORT = 3000 } = process.env;
const app = express();

// Временное решение для авторизаци
app.use((req, res, next) => {
  req.user = {
    _id: '625edd230f91a3a3aeb41a5d',
  };

  next();
});

async function main() {
  try {
    // подключаемся к серверу mongo
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (error) {
    console.log(error);
  }

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`); // покажет какой порт слушает приложение
  });
}

app.use(express.json());
app.use(routes);

main();
