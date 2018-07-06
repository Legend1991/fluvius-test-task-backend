'use strict'

const Controller = require('./controller')

class EventController extends Controller {
  constructor ({eventInteractor}) {
    super()
    this._eventInteractor = eventInteractor
  }

  async createEvent (req, res, next) {
    let {name, date} = req.body
    let token = req.headers && req.headers.authorization

    return this._eventInteractor.createEvent({token, name, date})
  }

  async getEvents (req, res, next) {
    let token = req.headers && req.headers.authorization
    let {offset, limit, from, to} = req.query

    return this._eventInteractor.getEvents({token, offset, limit, from, to})
  }

  async updateEvent (req, res, next) {
    let token = req.headers && req.headers.authorization
    let {name, date} = req.body
    let {id} = req.params

    return this._eventInteractor.updateEvent({token, id, name, date})
  }

  async removeEvent (req, res, next) {
    let token = req.headers && req.headers.authorization
    let {id} = req.params

    return this._eventInteractor.removeEvent({token, id})
  }
}

module.exports = EventController
