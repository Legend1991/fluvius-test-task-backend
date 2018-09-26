const ValidationError = require('./validation-error')
const AccessError = require('./access-error')
const InvalidTokenError = require('./invalid-token-error')
const TokenExpiredError = require('./token-expired-error')
const NotFoundError = require('./not-found-error')

module.exports = {
  ValidationError,
  AccessError,
  InvalidTokenError,
  TokenExpiredError,
  NotFoundError
}
