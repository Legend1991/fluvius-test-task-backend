const ExtendableError = require('es6-error')

class InvalidTokenError extends ExtendableError {
  constructor (message = '') {
    super(message)
  }
}

module.exports = InvalidTokenError
