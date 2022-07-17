const { BAD_AUTH_ERROR } = require('../errorCodes');

class BadAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_AUTH_ERROR;
  }
}

module.exports = BadAuthError;
