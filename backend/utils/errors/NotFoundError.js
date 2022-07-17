const { NOT_FOUND_STATUS } = require('../errorCodes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS;
  }
}

module.exports = NotFoundError;
