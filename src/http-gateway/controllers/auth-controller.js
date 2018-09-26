'use strict'

const Controller = require('./controller')

class AuthController extends Controller {
  constructor ({loginUser}) {
    super()
    this._loginUser = loginUser
  }

  async login (req, res, next) {
    let {email, password} = req.body

    return this._loginUser.execute({email, password})
  }
}

module.exports = AuthController
