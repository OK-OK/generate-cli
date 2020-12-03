/*
 * @Author: JL Guan
 * @Date: 2020-12-01 14:18:15
 * @description: file description
 * @LastEditTime: 2020-12-03 10:55:44
 * @FilePath: \generate-cli\lib\util\questions.js
 */

const { projectName, commands, chalk } = require('../share-util')

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
            choices: [
                'Default（create default cli）',
                // 'Manually select features'
            ],
        },
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

    // console.log(`✨  Creating project in ${process.cwd()}.`)
    // console.log(`🗃  Initializing git repository...`)
    // console.log(`⚙️  Installing CLI plugins. This might take a while...`)

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