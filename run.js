'use strict'

const config = require('./config')
const Server = require('./server')
const Router = require('./router')
const {AuthController, EventController} = require('./controllers')
const {UserInteractor, EventInteractor} = require('./interactors')
const {UserDataMapper, EventDataMapper} = require('./data-gateways')
const Encryptor = require('./encryptor')
const Validator = require('./validator')
const Authorizer = require('./authorizer')
const MongoClient = require('mongodb').MongoClient

async function run () {
  try {
    let client = await MongoClient.connect(config.db.url, {useNewUrlParser: true})

    console.log('Mongo client connected to', config.db.url)

    let db = client.db(config.db.name)

    let encryptor = new Encryptor(config)

    await db.collection('users').updateOne({
      email: 'test@email.com'
    }, {
      $set: {
        email: 'test@email.com',
        passwordHash: await encryptor.generateHash('test')
      }
    }, {
      upsert: true
    })

    let userGateway = new UserDataMapper({db, encryptor})
    let eventGateway = new EventDataMapper({db})

    let authorizer = new Authorizer({userGateway, encryptor})
    let validator = new Validator()

    let userInteractor = new UserInteractor({userGateway, validator, encryptor})
    let eventInteractor = new EventInteractor({eventGateway, validator, authorizer})

    let authController = new AuthController({userInteractor})
    let eventController = new EventController({eventInteractor})

    let router = new Router({authController, eventController})
    let server = new Server({config, router})

    let {port} = await server.run()

    console.log('Server started on port: ', port)
  } catch (error) {
    console.log(error.message)
  }
}

run()
