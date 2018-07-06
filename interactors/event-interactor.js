const {ValidationError, NotFoundError} = require('../errors')
const {Event} = require('../entities')

class EventInteractor {
  constructor ({eventGateway, validator, authorizer}) {
    this._eventGateway = eventGateway
    this._validator = validator
    this._authorizer = authorizer
  }

  async createEvent ({token, name, date}) {
    await this._authorizer.auth(token)
    this._validateCreateEventInput({name, date})

    let event = new Event({data: {name, date}})

    return this._eventGateway.saveEvent(event)
  }

  async getEvents ({token, offset = 0, limit = 10, from, to}) {
    await this._authorizer.auth(token)
    this._validateGetEventsInput({offset, limit, from, to})

    offset = Number(offset)
    limit = Number(limit)

    return this._eventGateway.getEventsData({offset, limit, from, to})
  }

  async updateEvent ({token, id, name, date}) {
    await this._authorizer.auth(token)
    this._validateUpdateEventInput({name, date})

    let event = await this._eventGateway.getEvent(id)

    if (!event) {
      throw new NotFoundError(`Event with id '${id}' is not exist`)
    }

    event.name = name
    event.date = new Date(date)

    await this._eventGateway.saveEvent(event)
  }

  async removeEvent ({token, id}) {
    await this._authorizer.auth(token)
    let event = await this._eventGateway.getEvent(id)

    if (!event) {
      throw new NotFoundError(`Event with id '${id}' is not exist`)
    }

    await this._eventGateway.removeEvent(event)
  }

  _validateCreateEventInput ({name, date}) {
    this._validateEventData({name, date})
  }

  _validateUpdateEventInput ({name, date}) {
    this._validateEventData({name, date})
  }

  _validateEventData ({name, date}) {
    if (this._validator.isEmpty(name)) {
      throw new ValidationError('Name is required', 'name')
    }

    if (this._validator.isEmpty(date)) {
      throw new ValidationError('Date is required', 'date')
    }

    if (!this._validator.isDate(date)) {
      throw new ValidationError('Should be a date string', 'date')
    }
  }

  _validateGetEventsInput ({offset, limit, from, to}) {
    if (!this._validator.isUint(offset)) {
      throw new ValidationError(
        'Should be an integer number and greater or equal zero',
        'offset'
      )
    }

    if (!this._validator.isUint(limit)) {
      throw new ValidationError(
        'Should be an integer number and greater or equal zero',
        'limit'
      )
    }

    if (from && !this._validator.isDate(from)) {
      throw new ValidationError('Should be a date string', 'from')
    }

    if (to && !this._validator.isDate(to)) {
      throw new ValidationError('Should be a date string', 'to')
    }
  }
}

module.exports = EventInteractor
