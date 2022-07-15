/*
 * @Author: JL Guan
 * @Date: 2020-07-08 14:35:11
 * @LastEditTime: 2022-07-15 15:43:20
 * @Description: init project
 * @FilePath: \generate-cli\lib\initProject.js
 */
const createDefault = require("./util/createDefault")
const createManually = require("./util/createManually")

module.exports = async (type, answers) => {
  answers.preset.includes("default")
    ? createDefault(type, answers)
    : createManually(type, answers)
}
