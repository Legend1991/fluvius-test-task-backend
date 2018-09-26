'use strict'

const config = require('../config')
const {Server, RouterGenerator, errorHandler} = require('./http-gateway')
const {UserAuthorizer, EventCreator, EventUpdater, EventsProvider, EventRemover} = require('./interactors')
const {UserMongoStorage, EventMongoStorage} = require('./data-gateways')
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

    let userGateway = new UserMongoStorage({db, encryptor})
    let eventGateway = new EventMongoStorage({db})

    let authorizer = new Authorizer({userGateway, encryptor})
    let validator = new Validator()

    let interactors = {
      userAuthorizer: new UserAuthorizer({userGateway, validator, encryptor}),
      eventCreator: new EventCreator({eventGateway, validator, authorizer}),
      eventUpdater: new EventUpdater({eventGateway, validator, authorizer}),
      eventsProvider: new EventsProvider({eventGateway, validator, authorizer}),
      eventRemover: new EventRemover({eventGateway, validator, authorizer})
    }

    let routerGenerator = new RouterGenerator(config.server.routerScheme, interactors, errorHandler)
    console.log(routerGenerator.generate())
    let server = new Server({
      config: config.server,
      router: routerGenerator.generate()
    })

    let {port} = await server.run()

    console.log('Server started on port: ', port)
  } catch (error) {
    console.log(error.message)
  }
}

run()
