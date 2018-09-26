'use strict'

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')

class Server {
  constructor ({config, router}) {
    this._config = config
    this._router = router
    this._server = express()

    this._init()
  }

  _init () {
    this._server.use(helmet())
    this._server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
      next()
    })
    this._server.use(morgan('tiny'))
    this._server.disable('x-powered-by')
    this._server.use(bodyParser.urlencoded({extended: true}))
    this._server.use(bodyParser.json({limit: '100mb'}))
    this._server.use(compression({threshold: 0}))
    this._server.use('/', this._router)
  }

  async run () {
    return new Promise((resolve) => {
      this._server.listen(
        this._config.port,
        resolve.bind(this, {
          port: this._config.port
        })
      )
    })
  }
}

module.exports = Server
