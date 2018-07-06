const ExtendableError = require('es6-error')

class NotFoundError extends ExtendableError {
  constructor (message = '') {
    super(message)
  }
}

module.exports = NotFoundError
