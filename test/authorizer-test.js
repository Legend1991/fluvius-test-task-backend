const assert = require('assert')
const {describe, it} = require('mocha')
const Authorizer = require('../src/authorizer')
const {User} = require('../src/entities')
const Encryptor = require('../src/encryptor')
const {InvalidTokenError} = require('../src/errors')

class AuthorizerTest {
  constructor () {
    this._encryptor = new Encryptor({
      secret: "The secret key. Shhh!... Don't tell it anybody!"
    })
    this._mockUserStorage = new MockUserStorage({
      encryptor: this._encryptor
    })
    this._authorizer = new Authorizer({
      encryptor: this._encryptor,
      userGateway: this._mockUserStorage
    })
  }

  run () {
    describe('Authorizer test', () => {
      this._checkAuth()
    })
  }

  _checkAuth () {
    describe('auth test', async () => {
      it('Invalid token couse InvalidTokenError', async () => {
        await this._assertThrowsAsync(this._authorizer.auth.bind(this._authorizer, 'invalid token'), InvalidTokenError)
      })

      it('Correct token does not couse InvalidTokenError', async () => {
        let user = await this._mockUserStorage.getUserByEmail('test@email.com')

        await this._assertDoesNotThrowAsync(this._authorizer.auth.bind(this._authorizer, user.token))
      })
    })
  }

  async _assertThrowsAsync (fn, error, message) {
    let f = () => {}
    try {
      await fn()
    } catch (e) {
      f = () => { throw e }
    } finally {
      assert.throws(f, error, message)
    }
  }

  async _assertDoesNotThrowAsync (fn, message) {
    let f = () => {}
    try {
      await fn()
    } catch (e) {
      f = () => { throw e }
    } finally {
      assert.doesNotThrow(f, message)
    }
  }
}

class MockUserStorage {
  constructor ({encryptor}) {
    this._encryptor = encryptor
  }

  async getUserByEmail (email) {
    if (email === 'test@email.com') {
      return new User({
        data: {
          id: 1,
          email: email,
          passwordHash: await this._encryptor.generateHash('test'),
          token: await this._encryptor.generateToken({email})
        },
        encryptor: this._encryptor
      })
    }

    return null
  }
}

module.exports = AuthorizerTest
