const CustomError = require('./custom-error')

class ValidationError extends CustomError {
  constructor (message = '', argName = '') {
    super(message)
    this._argName = argName
  }

  get argName () {
    return this._argName
  }
}

module.exports = ValidationError
