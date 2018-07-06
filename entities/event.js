class Event {
  constructor ({
    data: {
      id,
      name,
      date
    }
  }) {
    this._id = id
    this._name = name
    this.date = date
  }

  get id () {
    return this._id
  }

  get name () {
    return this._name
  }

  set name (value) {
    this._name = value
  }

  get date () {
    return this._date
  }

  set date (value) {
    if (typeof (value) === 'string') {
      value = new Date(value)
    }

    this._date = value
  }
}

module.exports = Event
