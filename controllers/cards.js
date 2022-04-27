const card = require('../models/card');
const ErrorNotFound = require('../errors/ErrorNotFound');
const BadRequestError = require('../errors/BadRequestError');

function handleError(err, res) {
  if (err.name === 'ValidationError') {
    return res.status(BadRequestError).send({ message: 'Переданы некорректные данные при создании карточки' });
  }
  if (err.name === 'CastError') {
    return res.status(BadRequestError).send({ message: 'Не валидный id карточки' });
  }
  return res.status(BadRequestError).send({ message: 'На сервере произошла ошибка' });
}

// GET /cards — возвращает все карточки
module.exports.getCards = (req, res) => {
  card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch((err) => handleError(err, res));
};

// POST /cards — создаёт карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  card.create({ name, link, owner })
    .then((newCard) => {
      res.send({ newCard });
    })
    .catch((err) => handleError(err, res));
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        // отправить ошибку 404
        return res.status(ErrorNotFound).send({ message: 'Карточка с указанным _id не найдена.' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => handleError(err, res));
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        // отправить ошибку 404
        return res.status(ErrorNotFound).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(200).send({ data: cards });
    })
    .catch((err) => handleError(err, res));
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((cards) => {
      if (!cards) {
        // отправить ошибку 404
        return res.status(ErrorNotFound).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.status(200).send({ data: cards });
    })
    .catch((err) => handleError(err, res));
};
