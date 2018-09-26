'use strict'

const {Router} = require('express')
const Controller = require('./controller')

class RouterGenerator {
  constructor (scheme, interactors, errorHandler) {
    this._scheme = scheme
    this._interactors = interactors
    this._errorHandler = errorHandler
    this._router = Router()
  }

  generate () {
    this._scheme.forEach(e => {
      let controller = new Controller(this._interactors[e.target],
        e.method, e.arg, this._errorHandler)
      this._router[e.type](e.path, controller.getRequestHandler())
    })

    return this._router
  }
}

module.exports = RouterGenerator
