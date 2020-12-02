/*
 * @Author: JL Guan
 * @Date: 2020-07-08 14:35:11
 * @LastEditTime: 2020-12-01 17:46:01
 * @Description: file description
 * @FilePath: \mine\generate-cli\lib\initProject.js
 */
const createDefault = require('./util/createDefault')
const createManually = require('./util/createManually')

module.exports = async (type, answers) => {
    answers.preset.includes('default') ? createDefault(type, answers) : createManually(type, answers)
}
