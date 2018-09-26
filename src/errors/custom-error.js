class CustomError extends Error {
  constructor (message = '') {
    super(message)

    this._message = message
    this._name = this.constructor.name

    if (Error.hasOwnProperty('captureStackTrace')) {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this._stack = (new Error(message)).stack
    }
  }

  get message () {
    return this._message
  }

  set message (value) {
    this._message = value
  }

  get name () {
    return this._name
  }

  set name (value) {
    this._name = value
  }

  get stack () {
    return this._stack
  }

  set stack (value) {
    this._stack = value
  }
}

module.exports = CustomError
