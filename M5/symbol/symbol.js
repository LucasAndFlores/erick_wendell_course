const assert = require('assert')

const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for normal objects'
user[uniqueKey] = 'value for symbol'

assert.deepStrictEqual(user.userName, 'value for normal objects')

//always unique in memory and use when you want to make a value private
assert.deepStrictEqual(user[Symbol('userName')], undefined)

//only way to get the value
// console.log(user[uniqueKey])
assert.deepStrictEqual(user[uniqueKey], 'value for symbol')

// interator
const obj = {
    [Symbol.iterator]:() => ({
        items: ['c', 'b', 'a'], 
        next() {
            return {
                done: this.items.length === 0,
                value: this.items.pop()
            }
        }
    })
}

assert.deepStrictEqual([...obj], [ 'a', 'b', 'c' ])


// metadata and not access the properties
const kItems = Symbol('kItems')
class myDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }

    [Symbol.toPrimitive](coercionType) {
        if(coercionType !== 'string') throw new TypeError()
        const itens = this[kItems].map((item) => new Intl.DateTimeFormat('pt-BR', {month: 'long', day: '2-digit', year: 'numeric'}).format(item))

        return new Intl.ListFormat('pt-BR', {style: 'long', type: "conjunction"}).format(itens)
    }

    *[Symbol.iterator](){
        for(const item of this[kItems]) {
            yield item
        }
    }

    async *[Symbol.asyncIterator] () {
        const timeout = ms => new Promise(r => setTimeout(r, ms))

        for(const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }

}

const myDateResult = new myDate([2020,03,01], [2020,02,02])

const expected = [new Date(2020,03,01), new Date(2020,02,02)]

assert.throws(() => myDateResult + 1, TypeError) // if try an operation with number
assert.deepStrictEqual(String(myDateResult), '01 de abril de 2020 e 02 de março de 2020') // if converts as string
assert.deepStrictEqual([...myDateResult], expected) // as interator 

;(async () => {
    // using as async interator
    for await (const item of myDateResult) {
        console.log(item)
    }
})()
