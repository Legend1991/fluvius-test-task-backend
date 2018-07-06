'use strict'

const {Router} = require('express')

class AuthRouter {
  constructor (controller) {
    this._router = Router()
    this._controller = controller

    this._init()
  }

  _init () {
    this._router.post('/', this._controller.call('createEvent'))
    this._router.get('/', this._controller.call('getEvents'))
    this._router.put('/:id', this._controller.call('updateEvent'))
    this._router.delete('/:id', this._controller.call('removeEvent'))
  }

  get middleware () {
    return this._router
  }
}

module.exports = AuthRouter
