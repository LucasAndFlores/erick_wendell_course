import {expect, describe, test, jest, beforeEach} from '@jest/globals'
import {OrderBusiness} from '../src/business/orderBusiness'
import {Order} from '../src/entities/order'

describe.only('Test suite for Template method design pattern', () => {

    beforeEach(() => {
        jest.restoreAllMocks()
    })

    describe('OrderBusiness', () => {
       test('execution Order Business without template method', () => {
            const order = new Order({customerId: 1, amount: 100.000, products: [{description: 'ferrari'}]})
            const orderBusiness = new OrderBusiness()

            const isValid = orderBusiness._validateRequiredFields(order)

            expect(isValid).toBeTruthy()

            const result = orderBusiness._create(order)
            expect(result).toBeTruthy()
       })
       test('execution Order Business with template method', () => {
            const order = new Order({customerId: 1, amount: 100.000, products: [{description: 'ferrari'}]})
            const orderBusiness = new OrderBusiness()

            const calledValidationMethod = jest.spyOn(orderBusiness, orderBusiness._validateRequiredFields.name)
            const calledCreateMethod = jest.spyOn(orderBusiness, orderBusiness._create.name)

            const result = orderBusiness.create(order)
            expect(result).toBeTruthy()
            expect(calledValidationMethod).toHaveBeenCalled()
            expect(calledCreateMethod).toHaveBeenCalled()
       }) 
    })

})
