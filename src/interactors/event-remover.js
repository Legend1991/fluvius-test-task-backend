const {NotFoundError} = require('../errors')

class EventRemover {
  constructor ({eventGateway, validator, authorizer}) {
    this._eventGateway = eventGateway
    this._validator = validator
    this._authorizer = authorizer
  }

  async remove ({token, id}) {
    await this._authorizer.auth(token)
    let event = await this._eventGateway.getEvent(id)

    if (!event) {
      throw new NotFoundError(`Event with id '${id}' is not exist`)
    }

    await this._eventGateway.removeEvent(event)
  }
}

module.exports = EventRemover
