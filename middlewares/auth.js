const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
