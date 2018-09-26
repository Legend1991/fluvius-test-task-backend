const CustomError = require('./custom-error')

class InvalidTokenError extends CustomError {
  constructor (message = '') {
    super(message)
  }
}

module.exports = InvalidTokenError
