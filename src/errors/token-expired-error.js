const CustomError = require('./custom-error')

class TokenExpiredError extends CustomError {
  constructor (message = '') {
    super(message)
  }
}

module.exports = TokenExpiredError
