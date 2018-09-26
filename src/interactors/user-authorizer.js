const {ValidationError, AccessError} = require('../errors')

class UserAuthorizer {
  constructor ({userGateway, validator, encryptor}) {
    this._userGateway = userGateway
    this._validator = validator
    this._encryptor = encryptor
  }

  async login ({email, password}) {
    if (!this._validator.isEmail(email)) {
      throw new ValidationError('Bad email format', 'email')
    }

    let user = await this._userGateway.getUserByEmail(email)

    if (!user) {
      throw new AccessError('Wrong email or password')
    }

    if (!(await user.verifyPassword(password))) {
      throw new AccessError('Wrong email or password')
    }

    await user.changeToken()
    await this._userGateway.saveUser(user)

    return user.token
  }
}

module.exports = UserAuthorizer
