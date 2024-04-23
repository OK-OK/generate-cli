/*
 * @Author: JL Guan
 * @Date: 2020-12-01 14:18:15
 * @description: inquirer questions
 * @LastEditTime: 2024-04-23 16:46:28
 * @FilePath: /generate-cli/lib/util/questions.js
 */

const { projectName, commands, chalk, packageList } = require("../share-util")

module.exports = function getQuestions(typeName) {
  const questions = [
    {
      type: "input",
      message: "project-name: ",
      name: "name",
      default: projectName,
      validate: name => {
        if (!name.trim()) {
          console.log(chalk.red("project-name must be a value!"))
          return false
        }
        return true
      }
    },
    {
      type: "list",
      message: "Please pick a preset: ",
      name: "preset",
      choices:  ["Default（create default cli）", "Manually select features"]
    },
    {
      when: ({ type = typeName, preset }) =>
        !preset.includes("default") && ["vite", "uni-app"].includes(type),
      type: "list",
      message: "Please pick a type vite: ",
      name: "languageType",
      choices: ["js", "ts"]
    },
    {
      when: ({ preset }) => !preset.includes("default"),
      type: "checkbox",
      message: "Check the features needed for your project: ",
      name: "packages",
      choices: ({ type = typeName, languageType }) => {
        let list = packageList[type].concat(packageList["public"])
        // ts 版本默认引入element-plus, qs, axios
        if (type === "vite" && languageType === "ts") {
          list = list.filter(
            k => !["element-plus", "qs", "axios"].includes(k.name)
          )
        }
        return list
      }
    },
    {
      when: ({ preset }) => !preset.includes("default"),
      type: "list",
      message: "Pick the package manager to use when installing dependencies: ",
      name: "manager",
      choices: ["Use Yarn", "Use NPM"]
    }
  ]

  if (!typeName) {
    questions.splice(1, 0, {
      type: "list",
      message: "type: ",
      name: "type",
      choices: [...commands.keys()]
    })
  }

  return questions
}
