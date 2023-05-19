'use strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter'
event.on(eventName, msg => console.log('counter update', msg))

const myCounter = {
    counter: 0
}

const proxy = new Proxy(myCounter, {
    set: (target, propertyKey, newValue) => { // happen when someone try to attribute a new value to the object
        event.emit(eventName, {newValue, key: target[propertyKey]})
        target[propertyKey] = newValue
        return true
    },
    
    get: (object, prop) => { // happen when someone try to access the attribute
        // console.log('calling', {object, prop})
        return object[prop]
    }
})

setInterval(function () {
    proxy.counter += 1
    if(proxy.counter === 10) clearInterval(this)
}, 200) //setInterval execute every x time

setTimeout(() => {
    proxy.counter = 4
    console.log('[2]: timeout')
}, 100) // executes in the future

setImmediate(() => {
    console.log('[1]: setImmediate', proxy.counter)
})

process.nextTick(() => { // executes now, but bad for nodejs lifecycle. Also, will be execute when called and will be the first to be executed
    proxy.counter = 2
    console.log('[0]: nextTick')
})
