const {InvalidTokenError} = require('./errors')

class Authorizer {
  constructor ({userGateway, encryptor}) {
    this._userGateway = userGateway
    this._encryptor = encryptor
  }

  async auth (token) {
    let {email} = await this._encryptor.checkToken(token)
    let user = await this._userGateway.getUserByEmail(email)

    if (!user || !(await user.verifyToken(token))) {
      throw new InvalidTokenError()
    }

    return user
  }
}

module.exports = Authorizer
