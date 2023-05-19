const {evaluateRegex} = require('./util')

class Person {
    constructor([
        nome,
        nacionalidade,
        estadoCivil,
        documento,
        rua,
        numero,
        bairro,
        estado
    ]){
        // ^ começo da string 
        // + um ou mais ocorrencias 
        // (\w{1}) seleciona somente a primeira letra de uma palavra e agrupa
        // a-zA-Z encontra letras maiusculas e minusculas, adicionamos o + para ele pegar o restante
        // g pra todas as ocorrências

        const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g)
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                return `${group1.toUpperCase()}${group2.toLowerCase()}`
            })
        }
        this.nome = nome
        this.nacionalidade = formatFirstLetter(nacionalidade)
        this.estadoCivil = formatFirstLetter(estadoCivil)
        // tudo que for digito (\D) vira vazio e seleciona apenas numeros \g server para remover todas as ocorrencias
        this.documento = documento.replace(evaluateRegex(/\D/g),'')
        // começa a procurar depois do "a" e pega tudo que vem pela frente
        // o (?<=) faz com que ignore tudo que tiver antes do match (positive lookBehind)
        this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
        this.numero = numero
        // começa a buscar de do espaço (\s) e captura toda a palavra
        this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/)).join()
        // remove o ponto literal (\.) do fim da frase
        this.estado = estado.replace(evaluateRegex(/\.$/), '')
    }
}

module.exports = Person