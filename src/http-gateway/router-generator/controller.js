class Controller {
  constructor (interactor, methodName, argScheme, errorHandler) {
    this._interactor = interactor
    this._methodName = methodName
    this._argScheme = argScheme
    this._errorHandler = errorHandler
  }

  getRequestHandler () {
    return async (req, res, next) => {
      try {
        let arg = this._retrieveArg(req)

        res.json({
          result: await this._interactor[this._methodName](arg)
        })
      } catch (error) {
        return this._errorHandler(error, res)
      }
    }
  }

  _retrieveArg (req) {
    return Object.keys(this._argScheme).reduce((res, key) => {
      if (typeof this._argScheme[key] === 'string') {
        res[key] = req[this._argScheme[key]][key]
      } else {
        res[key] = req[this._argScheme[key].from][this._argScheme[key].property]
      }

      return res
    }, {})
  }
}

module.exports = Controller
