const assert = require('assert')
const {describe, it} = require('mocha')
const Validator = require('../src/validator')

class ValidatorTest {
  run () {
    describe('Validator test', () => {
      this._checkEmailValidation()
      this._checkUIntValidation()
      this._checkUnsignedValidation()
      this._checkNumericValidation()
      this._checkEmptyValidation()
      this._checkDateValidation()
    })
  }

  _checkEmailValidation () {
    it('Check email validation', async () => {
      const validator = new Validator()

      assert.equal(validator.isEmail(''), false,
        'It is expected that the empty string is not valid email')
      assert.equal(validator.isEmail('test@email.com*1'), false,
        'It is expected that the email "test@email.com*1" string is not valid email')
      assert.equal(validator.isEmail('test@email.com'), true,
        'It is expected that the email "test@email.com" string is valid email')
      assert.equal(validator.isEmail('qwerty@gmail.com'), true,
        'It is expected that the email "qwerty@gmail.com" string is valid email')
      assert.equal(validator.isEmail('qwerty+3@gmail.com'), true,
        'It is expected that the email "qwerty+3@gmail.com" string is valid email')
      assert.equal(validator.isEmail('qwerty@mail.com.ua'), true,
        'It is expected that the email "qwerty@mail.com.ua" string is valid email')
    })
  }

  _checkUIntValidation () {
    it('Check uint validation', async () => {
      const validator = new Validator()

      assert.equal(validator.isUInt(1), true,
        'It is expected that the 1 number is valid uint')
      assert.equal(validator.isUInt(1.1), false,
        'It is expected that the 1.1 number is not valid uint')
      assert.equal(validator.isUInt('1'), true,
        'It is expected that the "1" string is valid uint')
      assert.equal(validator.isUInt('1.1'), false,
        'It is expected that the "1.1" string is not valid uint')
      assert.equal(validator.isUInt(''), false,
        'It is expected that the empty string is not valid uint')
    })
  }

  _checkUnsignedValidation () {
    it('Check unsigned validation', async () => {
      const validator = new Validator()

      assert.equal(validator.isUnsigned(1), true,
        'It is expected that the 1 number is valid unsigned')
      assert.equal(validator.isUnsigned(1.1), true,
        'It is expected that the 1.1 number is valid unsigned')
      assert.equal(validator.isUnsigned(0), true,
        'It is expected that the 0 number is valid unsigned')
      assert.equal(validator.isUnsigned(-0), true,
        'It is expected that the -0 number is valid unsigned')
      assert.equal(validator.isUnsigned(-1), false,
        'It is expected that the -1 number is not valid unsigned')
      assert.equal(validator.isUnsigned(-1.1), false,
        'It is expected that the -1.1 number is not valid unsigned')
      assert.equal(validator.isUnsigned('1'), true,
        'It is expected that the "1" string is valid unsigned')
      assert.equal(validator.isUnsigned('-1'), false,
        'It is expected that the "-1" string is not valid unsigned')
    })
  }

  _checkNumericValidation () {
    it('Check numeric validation', async () => {
      const validator = new Validator()

      assert.equal(validator.isNumeric(1), true,
        'It is expected that the 1 number is valid numeric')
      assert.equal(validator.isNumeric(true), false,
        'It is expected that the "true" boolean is not valid numeric')
      assert.equal(validator.isNumeric('sdsdf'), false,
        'It is expected that the "sdsdf" string is not valid numeric')
      assert.equal(validator.isNumeric('1'), true,
        'It is expected that the "1" number is valid numeric')
      assert.equal(validator.isNumeric('1.1'), true,
        'It is expected that the "1.1" number is valid numeric')
      assert.equal(validator.isNumeric(-1), true,
        'It is expected that the "-1" number is valid numeric')
      assert.equal(validator.isNumeric('123sdf'), false,
        'It is expected that the "123sdf" string is not valid numeric')
    })
  }

  _checkEmptyValidation () {
    it('Check empty validation', async () => {
      const validator = new Validator()

      assert.equal(validator.isEmpty(null), true,
        'It is expected that the null is valid empty value')
      assert.equal(validator.isEmpty(true), false,
        'It is expected that the "true" boolean is not valid empty value')
      assert.equal(validator.isEmpty(''), true,
        'It is expected that the "" string is valid empty value')
      assert.equal(validator.isEmpty('sdf'), false,
        'It is expected that the "sdf" string is not valid empty value')
      assert.equal(validator.isEmpty(0), false,
        'It is expected that the "0" number is not valid empty value')
    })
  }

  _checkDateValidation () {
    it('Check date validation', async () => {
      const validator = new Validator()

      assert.equal(validator.isDate((new Date()).toString()), true,
        'It is expected that the current Date string is valid date')
      assert.equal(validator.isDate(null), false,
        'It is expected that the null is not valid date')
      assert.equal(validator.isDate('27-05-2018'), false,
        'It is expected that the "27-05-2018" string is not valid date')
      assert.equal(validator.isDate('05-27-2018'), true,
        'It is expected that the "05-27-2018" string is valid date')
      assert.equal(validator.isDate(''), false,
        'It is expected that the empty string is not valid date')
    })
  }
}

module.exports = ValidatorTest
