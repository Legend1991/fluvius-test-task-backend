'use strict'

const {
  ValidationError,
  AccessError,
  InvalidTokenError,
  TokenExpiredError,
  NotFoundError
} = require('../errors')

class Controller {
  call (method) {
    return async (req, res, next) => {
      try {
        res.json({
          result: await this[method](req, res, next)
        })
      } catch (error) {
        return this._handleError(error, res)
      }
    }
  }

  _handleError (error, res) {
    if (error instanceof ValidationError) {
      return res.status(422).json({
        errors: [{field: error.argName, message: error.message}]
      })
    }

    if (error instanceof AccessError) {
      return res.status(422).json({
        errors: [
          {field: 'email', message: error.message},
          {field: 'password', message: error.message}
        ]
      })
    }

    if (error instanceof InvalidTokenError) {
      return res.status(403).json({
        errors: [{message: 'Invalid authorization token'}]
      })
    }

    if (error instanceof TokenExpiredError) {
      return res.status(403).json({
        errors: [{message: 'Authorization token is expired'}]
      })
    }

    if (error instanceof NotFoundError) {
      return res.status(404).json({
        errors: [{message: error.message}]
      })
    }

    return res.status(500).json({errors: [{message: error.message}]})
  }
}

module.exports = Controller
