const user = require('../models/user');

const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL,
} = require('../errors/error_code');

// GET /users/:userId - возвращает пользователя по _id
module.exports.getUser = (req, res) => {
  user.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send({data: user});
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send({message: 'Ошибка. Пользователь не найден, попробуйте еще раз'});
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({message: 'Ошибка. Введен некорректный id пользователя'});
      } else {
        res.status(ERROR_CODE_INTERNAL).send({message: 'На сервере произошла ошибка'});
      }
    });
};

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  user.find({})
    .then((user) => {
      res.status(200).send({data: user});
    })
    .catch(() => {
      res.status(ERROR_CODE_INTERNAL).send({message: 'На сервере произошла ошибка'});
    });
};

// POST /users — создаёт пользователя
module.exports.postUsers = (req, res) => {
  const {name, about, avatar} = req.body;

  user.create({name, about, avatar})
    .then((user) => {
      res.status(200).send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({message: 'Переданы некорректные данные при создании пользователя'});
      } else {
        res.status(ERROR_CODE_INTERNAL).send({message: 'На сервере произошла ошибка'});
      }
    });
};

// PATCH /users/me — обновляет профиль
module.exports.updateUserInfo = (req, res) => {
  const {name, about} = req.body;

  user.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({message: 'Пользователь по указанному id не найден'});
      }
      return res.status(200).send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({message: 'Переданы некорректные данные при редактировании пользователя'});
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({message: 'Пользователь по указанному _id не найден.'});
      }
      res.status(ERROR_CODE_INTERNAL).send({message: 'На сервере произошла ошибка'});
    });
};

// PATCH /users/me/avatar — обновляет аватар профиля
module.exports.updateAvatar = (req, res) => {
  const {avatar} = req.body;

  user.findByIdAndUpdate(req.user._id, {avatar}, {new: true, runValidators: true})
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({message: 'Пользователь по указанному id не найден'});
      }
      return res.status(200).send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({message: 'Переданы некорректные данные при редактировании пользователя'});
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({message: 'Пользователь по указанному _id не найден.'});
      }
      res.status(ERROR_CODE_INTERNAL).send({message: 'На сервере произошла ошибка'});
    });
};