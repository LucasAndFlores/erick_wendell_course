
import database from './database.json'
import TerminalController from './terminalController.js'
import Person from './person.js'
import { save } from './repository.js'

const DEFAULT_LANG = 'pt-BR'
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop () {
	try {
		const answer = await terminalController.question()

		if (answer === STOP_TERM) {
			terminalController.closeTerminal()
			console.log('process finished')
			return;
		}

		const insertPerson = Person.generateInstanceFromString(answer)
		terminalController.updateTable(insertPerson.formated(DEFAULT_LANG))
		await save(insertPerson)

		return mainLoop()
	} catch (error) {
		console.log('deu erro', error)
	
	}
}

await mainLoop()
