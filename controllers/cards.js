const card = require('../models/card');

const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL,
} = require('../errors/error_code');

// GET /cards — возвращает все карточки
module.exports.getCards = (req, res) => {
  card.find({})
    .then((cards) => {
      res.status(200).send({data: cards});
    })
    .catch(() => {
      res.status(ERROR_CODE_INTERNAL).send({message: 'На сервере произошла ошибка'});
    });
};

// POST /cards — создаёт карточку
module.exports.createCard = (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;
  card.create({name, link, owner})
    .then((card) => {
      res.send({card});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({message: 'Переданы некорректные данные при создании карточки'});
      } else {
        res.status(ERROR_CODE_INTERNAL).send({message: 'На сервере произошла ошибка'});
      }
    });
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((cards) => {
      if (!cards) {
        // отправить ошибку 404
        res.status(ERROR_CODE_NOT_FOUND).send({message: 'Карточка с указанным _id не найдена.'});
      } else {
        res.send({data: cards});
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({message: err.message});
      }
      return res.status(ERROR_CODE_INTERNAL).send({message: 'На сервере произошла ошибка'});
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    {$addToSet: {likes: req.user._id}}, // добавить _id в массив, если его там нет
    {new: true},
  )
    .then((cards) => {
      if (!cards) {
        // отправить ошибку 404
        res.status(ERROR_CODE_NOT_FOUND).send({message: 'Передан несуществующий _id карточки.'});
      }
      res.status(200).send({data: cards});
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({message: err.message});
      } else {
        res.status(ERROR_CODE_INTERNAL).send({message: 'На сервере произошла ошибка'});
      }
    });
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    {$pull: {likes: req.user._id}}, // убрать _id из массива
    {new: true},
  )
    .then((cards) => {
      if (!cards) {
        // отправить ошибку 404
        res.status(ERROR_CODE_NOT_FOUND).send({message: 'Передан несуществующий _id карточки.'});
      }
      res.status(200).send({data: cards});
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({message: err.message});
      } else {
        res.status(ERROR_CODE_INTERNAL).send({message: 'На сервере произошла ошибка'});
      }
    });
};