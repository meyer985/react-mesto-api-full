const jwt = require('jsonwebtoken');
const BadAuthError = require('../utils/errors/BadAuthError');

module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new BadAuthError('Ошибка авторизации');
  }

  let payload;
  try {
    payload = jwt.verify(req.cookies.jwt, 'mesto-key');
  } catch (e) {
    throw new BadAuthError('Ошибка авторизации');
  }

  req.user = payload;

  next();
};
