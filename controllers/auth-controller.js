'use strict'

const Controller = require('./controller')

class AuthController extends Controller {
  constructor ({userInteractor}) {
    super()
    this._userInteractor = userInteractor
  }

  async login (req, res, next) {
    let {email, password} = req.body

    return this._userInteractor.login({email, password})
  }
}

module.exports = AuthController
