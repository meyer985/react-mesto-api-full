const { CONFLICT_REQUEST } = require('../errorCodes');

class ConflictRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_REQUEST;
  }
}

module.exports = ConflictRequestError;
