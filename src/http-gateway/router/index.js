'use strict'

const {Router} = require('express')
const AuthRouter = require('./auth-router')
const EventRouter = require('./event-router')

class WrappedRouter {
  constructor ({authController, eventController}) {
    this._router = Router()
    this._authRouter = new AuthRouter(authController)
    this._eventRouter = new EventRouter(eventController)

    this._init()
  }

  _init () {
    this._router.use('/', this._authRouter.middleware)
    this._router.use('/events', this._eventRouter.middleware)
  }

  get middleware () {
    return this._router
  }
}

module.exports = WrappedRouter
