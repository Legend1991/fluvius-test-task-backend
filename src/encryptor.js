const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const {InvalidTokenError, TokenExpiredError} = require('./errors')

class Encryptor {
  constructor ({secret}) {
    this._secret = secret
  }

  async generateHash (source) {
    return argon2.hash(source)
  }

  async checkHash (hash, source) {
    return argon2.verify(hash, source)
  }

  async generateToken (data, expDate) {
    return jwt.sign(data, this._secret, {expiresIn: '1d', algorithm: 'HS384'})
  }

  async checkToken (token) {
    try {
      return jwt.verify(token, this._secret, {algorithm: 'HS384'})
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new InvalidTokenError()
      }

      if (error.name === 'TokenExpiredError') {
        throw new TokenExpiredError()
      }

      throw error
    }
  }
}

module.exports = Encryptor
