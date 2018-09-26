const {ValidationError, NotFoundError} = require('../errors')

class EventUpdater {
  constructor ({eventGateway, validator, authorizer}) {
    this._eventGateway = eventGateway
    this._validator = validator
    this._authorizer = authorizer
  }

  async update ({token, id, name, date}) {
    await this._authorizer.auth(token)
    this._validateInputData({name, date})

    let event = await this._eventGateway.getEvent(id)

    if (!event) {
      throw new NotFoundError(`Event with id '${id}' is not exist`)
    }

    event.name = name
    event.date = new Date(date)

    await this._eventGateway.saveEvent(event)
  }

  _validateInputData ({name, date}) {
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
}

module.exports = EventUpdater
