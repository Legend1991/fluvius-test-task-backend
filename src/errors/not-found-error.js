const CustomError = require('./custom-error')

class NotFoundError extends CustomError {
  constructor (message = '') {
    super(message)
  }
}

module.exports = NotFoundError
