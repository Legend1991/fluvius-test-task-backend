const ExtendableError = require('es6-error')

class TokenExpiredError extends ExtendableError {
  constructor (message = '') {
    super(message)
  }
}

module.exports = TokenExpiredError
