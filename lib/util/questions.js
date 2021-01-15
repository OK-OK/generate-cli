/*
 * @Author: JL Guan
 * @Date: 2020-12-01 14:18:15
 * @description: inquirer questions
 * @LastEditTime: 2021-01-15 10:02:08
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
            when: ({ type }) => type === 'vue',
            type: 'list',
            message: 'Please pick a preset: ',
            name: 'preset',
            choices: [
                'Default（create default cli）',
                'Manually select features'
            ],
        },
        {
            when: ({ type }) => type !== 'vue',
            type: 'list',
            message: 'Please pick a preset: ',
            name: 'preset',
            choices: [
                'Default（create default cli）',
                // 'Manually select features'
            ],
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