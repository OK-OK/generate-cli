/*
 * @Author: JL Guan
 * @Date: 2020-12-02 10:43:11
 * @description: config
 * @LastEditTime: 2022-07-14 16:40:54
 * @FilePath: \generate-cli\lib\util\config.js
 */
const version = require("../../package.json").version
const projectName = "generate-cli"
const commands = new Map([
  ["vue", "vue create "],
  ["react", "npx create-react-app "],
  ["vite", "npm init vite@latest "],
  ["uni-app", "vue create -p dcloudio/uni-preset-vue "]
])
const packageList = require("./packageList")
const packageQuestions = [
  {
    when: ({ type }) => ["vite", "uni-app"].includes(type),
    type: "list",
    message: "Please pick a type vite: ",
    name: "languageType",
    choices: ["js", "ts"]
  }
]

module.exports = {
  version,
  projectName,
  commands,
  packageQuestions,
  packageList
}
