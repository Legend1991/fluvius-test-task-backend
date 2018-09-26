const {ValidationError} = require('../errors')
const {Event} = require('../entities')

class EventCreator {
  constructor ({eventGateway, validator, authorizer}) {
    this._eventGateway = eventGateway
    this._validator = validator
    this._authorizer = authorizer
  }

  async create ({token, name, date}) {
    await this._authorizer.auth(token)
    this._validateInputData({name, date})

    let event = new Event({data: {name, date}})

    return this._eventGateway.saveEvent(event)
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

module.exports = EventCreator
