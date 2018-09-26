const {Event} = require('../entities')
const ObjectID = require('mongodb').ObjectID

class EventMongoStorage {
  constructor ({db}) {
    this._db = db
  }

  async getEvent (id) {
    let data = await this._db.collection('events').findOne({
      _id: ObjectID.createFromHexString(id)
    })

    if (data) {
      return this._mapDataToEvent(data)
    }

    return null
  }

  async saveEvent (event) {
    let res = await this._db.collection('events').updateOne({
      _id: (event.id && ObjectID.createFromHexString(event.id)) || new ObjectID()
    }, {
      $set: {
        name: event.name,
        date: event.date.toISOString()
      }
    }, {
      upsert: true
    })

    if (res.result.upserted) {
      return res.result.upserted[0]._id
    }
  }

  async getEvents ({offset, limit, from, to}) {
    let cursor = await this._db.collection('events')
      .find()
      .skip(offset)
      .limit(limit)
      .sort({date: 1})

    if (from || to) {
      let filter = {}

      if (from) {
        filter.$gte = (new Date(from)).toISOString()
      }

      if (to) {
        filter.$lte = (new Date(to)).toISOString()
      }

      cursor.filter({
        date: filter
      })
    }

    return cursor.toArray().map(this._mapDataToEvent)
  }

  async removeEvent (event) {
    await this._db.collection('events').deleteOne({
      _id: event.id && ObjectID.createFromHexString(event.id)
    })
  }

  _mapDataToEvent (data) {
    return new Event({
      data: {
        id: data._id.toHexString(),
        name: data.name,
        date: data.date
      }
    })
  }
}

module.exports = EventMongoStorage
