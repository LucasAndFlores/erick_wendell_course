import mocha from 'mocha'
const {describe, it} = mocha
import chai from 'chai'
const {expect} = chai
import Person from '../src/person.js'

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

    it('should return a person formatted from a string', () => {
        const person = new Person({
            from: '2002-02-15',
            to: '2021-05-16',
            vehicles: ['navio', 'aviao'],
            kmTraveled: '20000',
            id: '1'
        })

        const formatted = person.formated('pt-BR')

        const expected = {
            id: 1,
            vehicles: 'navio e aviao',
            kmTraveled: '20.000 km',
            from: '15 de fevereiro de 2002',
            to: '16 de maio de 2021'
        }

        expect(formatted).to.be.deep.equal(expected)
    })

})

