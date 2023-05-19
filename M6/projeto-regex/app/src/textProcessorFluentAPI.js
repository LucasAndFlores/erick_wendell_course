const {evaluateRegex} = require('./util')
const Person = require('./person')

class TextProcessorFluentAPI {
    #content

    constructor(content) {
        this.#content = content
    }

    extractPeopleData() {
        // ?<= vai extrair os dados que virão depois desse grupo
        // [contratante|contratada] ou um ou outro, (e usa a flag I para pegar maisculo ou minusculo)
        // :s{1} vai procurar caracter literal do dois pontos seguido de espaço
        // tudo acima fica dentro de parenteses para falar "vamos pegar dali pra frente"

        // (?!s) negative look around, vai ignorar os contratantes do final do arquivo
        // .*\n pega qualquer coisa até o primeiro \n 
        // .*? non greety, o ? faz com que ele pare na primeira recorrencia, evitando ficar em loop 

        // g = global 
        // m = multiline 
        // i = insensitive
        
        const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
        
        // faz o match para encontrar a string inteira que contem os dados que precisamos
        const onlyPerson = this.#content.match(matchPerson)
        // console.log('onlyPerson', matchPerson.test(this.#content) )
        this.#content = onlyPerson

        return this
    }

    divideTextInColumns() {
        const splitRegex = evaluateRegex(/,/)
        this.#content = this.#content.map(line => line.split(splitRegex))

        return this
    }

    removeEmptyCharacters() {
        const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map((line) => line.map((item) => item.replace(trimSpaces, "")))
        return this
    }

    mapPerson () {
        this.#content = this.#content.map(line => new Person(line))

        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI