const jwt = require('jsonwebtoken');
const BadAuthError = require('../utils/errors/BadAuthError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new BadAuthError('Ошибка авторизации');
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(
      token,
      process.env.NODE_ENV === 'production'
        ? process.env.JWT_SECRET
        : 'mesto-key',
    );
  } catch (e) {
    throw new BadAuthError('Ошибка авторизации');
  }

  req.user = payload;

  next();
};

module.exports = auth;
