

/*

const ErrorNotFound = require('../errors/ErrorNotFound');
// const ValidationError = require('../errors/ValidationError');
// const ErrorDefault = require('../errors/ErrorDefault');
const Cards = require('../models/card');
// const errorMessageValid = new ValidationError('Переданы некорректные данные');
// const errorMessageNotFound = new ErrorNotFound('Карточка не найдена');
// const errorMessageDefault = new ErrorDefault('Ошибка по-умолчанию');

module.exports.getCard = (req, res) => {
  Cards.find({}).then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: 'Ошибка по-умолчанию', err }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Cards.create({ name, link, owner: ownerId })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' });
    });
};
module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new ErrorNotFound('Карточка не найдена');
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' });
    });
};

module.exports.dislikeCard = (req, res) => { Cards.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
  .orFail(() => {throw new ErrorNotFound('Карточка не найдена');
  })
  .then((card) => res.status(200).send({ data: card }))
  .catch((err) => {
    if (err.statusCode === 400 || err.name === 'ValidationError' || err.name === 'CastError') { return res.status(400).send({ message: 'Переданы некорректные данные' });
    }
    if (err.statusCode === 404 || err.name === 'CastError') {
      return res.status(404).send({ message: 'Карточка не найдена' });
    }
    return res.status(500).send({ message: 'Ошибка по-умолчанию' });
  });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndRemove(req.params.cardId)
    .orFail(() => { throw new ErrorNotFound('Карточка не найдена');
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') { return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.errorMessage });
      }
      return res.status(500).send({ message: 'Ошибка по-умолчанию' });
    });
};


 */


const card = require('../models/card');

module.exports.getCards = (req, res) => {
  card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({
      name: card.name,
      link: card.link,
      owner: card.owner,
      likes: card.likes,
      _id: card._id,
      createAt: card.createAt,
    }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  console.log('req = ', req);
  card.findByIdAndRemove(req.params.cardId)
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'карта не найдена' });
      }
      res.status(500).send({ message: err.message });
    });
};