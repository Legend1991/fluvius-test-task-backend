const CustomError = require('./custom-error')

class AccessError extends CustomError {
  constructor (message = '') {
    super(message)
  }
}

module.exports = AccessError
