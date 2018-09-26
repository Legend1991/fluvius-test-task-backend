const {describe} = require('mocha')
const ValidatorTest = require('./validator-test')
const AuthorizerTest = require('./authorizer-test')

describe('Unit tests', () => {
  let validatorTest = new ValidatorTest()
  validatorTest.run()

  let authorizerTest = new AuthorizerTest()
  authorizerTest.run()
})
