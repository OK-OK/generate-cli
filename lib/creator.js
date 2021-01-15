/*
 * @Author: JL Guan
 * @Date: 2020-12-02 10:43:11
 * @description: create
 * @LastEditTime: 2021-01-15 10:03:11
 * @FilePath: \mine\generate-cli\lib\creator.js
 */
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
