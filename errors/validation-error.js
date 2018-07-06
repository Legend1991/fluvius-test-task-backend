const ExtendableError = require('es6-error')

class ValidationError extends ExtendableError {
  constructor (message = '', field = '') {
    super(message)
    this._field = field
  }

  get field () {
    return this._field
  }
}

module.exports = ValidationError
