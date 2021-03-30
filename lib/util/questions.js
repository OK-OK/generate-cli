/*
 * @Author: JL Guan
 * @Date: 2020-12-01 14:18:15
 * @description: inquirer questions
 * @LastEditTime: 2021-03-30 14:24:46
 * @FilePath: \mine\generate-cli\lib\util\questions.js
 */

const { projectName, commands, chalk, packageQuestions } = require('../share-util')

module.exports = function getQuestions(type) {
    const questions = [
        {
            type: 'input',
            message: 'project-name: ',
            name: 'name',
            default: projectName,
            validate: name => {
                if (!name.trim()) {
                    console.log(chalk.red('project-name must be a value!'))
                    return false
                }
                return true
            }
        },
        {
            type: 'list',
            message: 'Please pick a preset: ',
            name: 'preset',
            choices: ({ type }) => {
                const list = [
                    'Default（create default cli）',
                ]            
                const typeList = ['vue', 'uni-app'];
                typeList.includes(type) && list.push('Manually select features')
                return list
            },
        },
        ...packageQuestions,
        {
            when: ({ preset }) => !preset.includes('default'),
            type: 'list',
            message: 'Pick the package manager to use when installing dependencies: ',
            name: 'manager',
            choices: [
                'Use Yarn',
                'Use NPM'
            ],
        }
    ]

    if (!type) {
        questions.splice(1, 0, {
            type: 'list',
            message: 'type: ',
            name: 'type',
            choices: [...commands.keys()],
        })
    }

    return questions
}