"use strict";var mocha;module.link('mocha',{default(v){mocha=v}},0);var chai;module.link('chai',{default(v){chai=v}},1);var Person;module.link('../src/person.js',{default(v){Person=v}},2);
const {describe, it} = mocha

const {expect} = chai


describe('Person', () => {
    it('should return a person instance from a string', () => {

        const createPerson = '1 navio,aviao 20000 2002-02-15 2021-05-16'

        const person = Person.generateInstanceFromString(createPerson)

        const expected = {
            from: '2002-02-15',
            to: '2021-05-16',
            vehicles: ['navio', 'aviao'],
            kmTraveled: '20000',
            id: '1'
        }

        expect(person).to.be.deep.equal(expected)
    })

})

