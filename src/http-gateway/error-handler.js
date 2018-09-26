const {
  ValidationError,
  AccessError,
  InvalidTokenError,
  TokenExpiredError,
  NotFoundError
} = require('../errors')

module.exports = (error, res) => {
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
