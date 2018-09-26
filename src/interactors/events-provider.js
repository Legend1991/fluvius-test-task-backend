const {ValidationError} = require('../errors')

class EventsProvider {
  constructor ({eventGateway, validator, authorizer}) {
    this._eventGateway = eventGateway
    this._validator = validator
    this._authorizer = authorizer
  }

  async fetch ({token, offset = 0, limit = 10, from, to}) {
    await this._authorizer.auth(token)
    this._validateInputData({offset, limit, from, to})

    offset = Number(offset)
    limit = Number(limit)

    let events = await this._eventGateway.getEvents({offset, limit, from, to})

    return events.map(e => {
      return {
        id: e.id,
        name: e.name,
        date: e.date
      }
    })
  }

  _validateInputData ({offset, limit, from, to}) {
    if (!this._validator.isUInt(offset)) {
      throw new ValidationError(
        'Should be an integer number and greater or equal zero',
        'offset'
      )
    }

    if (!this._validator.isUInt(limit)) {
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

module.exports = EventsProvider
