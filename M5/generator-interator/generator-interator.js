const assert = require('assert')

function* calculation(num1, num2) {
    return num1 * num2
}

function* main() {
    yield "hello"
    yield "-"
    yield "world"
    yield* calculation(20,10)
}

const generator = main()

//way to execute a generator function
// 1 - using next
assert.deepEqual(generator.next(), {
    value: 'hello',
    done: false
})

// 2 - using array from
assert.deepEqual(Array.from(main()), ['hello', '-', 'world'])

//3 - using spread operator
assert.deepEqual([...main()], ['hello', '-', 'world'])

// async interator
const {readFile, readdir, stat} = require('fs/promises')
async function* systemInfo () {
    const file = await readFile(__filename)
    yield {file: file.toString()}

    const {size} = await stat(__filename)
    yield {size}

    const dir = await readdir(__dirname)
    yield {dir}
}

;(async() => {
    for await (const item of systemInfo()) {
        console.log("System info", item)
    }
})();

