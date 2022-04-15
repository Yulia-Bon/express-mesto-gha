const express = require('express');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const _id = 1;

console.log(_id);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
