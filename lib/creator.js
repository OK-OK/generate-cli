const inquirer = require('inquirer')
const initProject = require('./initProject')
const getQuestions = require('./util/questions')

class Creator {
    constructor(type) {
        this.type = type
        this.init();
    }
    async init() {
        const { type } = this
        const answers = await inquirer.prompt(getQuestions(type))
        initProject(type || answers.type, answers)
    }
}

module.exports = Creator
