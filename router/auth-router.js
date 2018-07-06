'use strict'

const {Router} = require('express')

class EventRouter {
  constructor (controller) {
    this._router = Router()
    this._controller = controller

    this._init()
  }

  _init () {
    this._router.post('/login', this._controller.call('login'))
  }

  get middleware () {
    return this._router
  }
}

module.exports = EventRouter
