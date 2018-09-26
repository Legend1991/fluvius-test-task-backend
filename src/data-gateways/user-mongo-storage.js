const {User} = require('../entities')
const ObjectID = require('mongodb').ObjectID

class UserMongoStorage {
  constructor ({db, encryptor}) {
    this._encryptor = encryptor
    this._db = db
  }

  async getUserByEmail (email) {
    let data = await this._db.collection('users').findOne({email})

    if (data) {
      return new User({
        data: {
          id: data._id.toHexString(),
          email: data.email,
          passwordHash: data.passwordHash,
          token: data.token
        },
        encryptor: this._encryptor
      })
    }

    return null
  }

  async saveUser (user) {
    let res = await this._db.collection('users').updateOne({
      _id: (user.id && ObjectID.createFromHexString(user.id)) || new ObjectID()
    }, {
      $set: {
        email: user.email,
        passwordHash: user.passwordHash,
        token: user.token
      }
    }, {
      upsert: true
    })

    if (res.result.upserted) {
      return res.result.upserted[0]._id
    }
  }
}

module.exports = UserMongoStorage
