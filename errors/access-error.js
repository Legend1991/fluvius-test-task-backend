const ExtendableError = require('es6-error')

class AccessError extends ExtendableError {
  constructor (message = '') {
    super(message)
  }
}

module.exports = AccessError
