import {expect, describe, test, jest, beforeEach} from '@jest/globals'
import {BaseBusiness} from '../src/business/base/baseBusiness'
import {NotImplementedException} from '../src/util/exceptions'

describe('#BaseBusiness', () => {

    beforeEach(() => {
        jest.restoreAllMocks()
    })

    test('Should throw an error when child class doesnt implement _validateRequiredFields method', () => {
        class ConcreteClass extends BaseBusiness {}
        const concreteClass = new ConcreteClass()

        const validationError = new NotImplementedException(
            concreteClass._validateRequiredFields.name
        )

        expect(() => concreteClass._validateRequiredFields({})).toThrow(validationError)
    })
    test('Should throw an error when _validateRequiredFields returns false', () => {
        const VALIDATION_DOESNT_SUCCEDED = false

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_DOESNT_SUCCEDED)
        }
        const concreteClass = new ConcreteClass()

        const validationError = new Error('Not valid')

        expect(() => concreteClass.create({})).toThrow(validationError)

    })
    test('Should throw an error when child class doesnt implement _create method', () => {
        const VALIDATION_SUCCEDED = true

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEDED)
        }

        const concreteClass = new ConcreteClass()

        const validationError = new NotImplementedException(
            concreteClass._create.name
        )

        expect(() => concreteClass.create({})).toThrow(validationError)      
    })

    test('Should call _create and _validateRequiredFields on create', () => {
        const VALIDATION_SUCCEDED = true
        const CREATE_SUCCEDED = true

        class ConcreteClass extends BaseBusiness {
            _validateRequiredFields = jest.fn().mockReturnValue(VALIDATION_SUCCEDED)
            _create = jest.fn().mockReturnValue(CREATE_SUCCEDED)
        }

        const concreteClass = new ConcreteClass()

        const createFromBaseClass = jest.spyOn(BaseBusiness.prototype, BaseBusiness.prototype.create.name)

        const result = concreteClass.create({}) 

        expect(result).toBeTruthy()
        expect(createFromBaseClass).toHaveBeenCalled()
        expect(concreteClass._create).toHaveBeenCalled()
        expect(concreteClass._validateRequiredFields).toHaveBeenCalled()
    })
})
