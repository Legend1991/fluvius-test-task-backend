class User {
  constructor ({
    data: {
      id,
      email,
      passwordHash,
      token
    },
    encryptor
  }) {
    this._id = id
    this._email = email
    this._passwordHash = passwordHash
    this._token = token
    this._encryptor = encryptor
  }

  get id () {
    return this._id
  }

  get email () {
    return this._email
  }

  get passwordHash () {
    return this._passwordHash
  }

  get token () {
    return this._token
  }

  async verifyPassword (password) {
    return this._encryptor.checkHash(this._passwordHash, password)
  }

  async setPassword (password) {
    this._passwordHash = await this._encryptor.generateHash(password)
  }

  async changeToken () {
    this._token = await this._encryptor.generateToken({email: this.email})
  }

  async verifyToken (token) {
    return this._token === token
  }
}

module.exports = User
