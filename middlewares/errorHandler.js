const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

  const massage = status === 500 ? 'На сервере произошла ошибка' : err.massage;
  res.status(status).send({ massage });
  next();
};

module.exports = errorHandler;
