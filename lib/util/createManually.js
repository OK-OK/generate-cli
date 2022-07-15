/*
 * @Author: JL Guan
 * @Date: 2020-12-01 17:44:41
 * @description: create manually cli
 * @LastEditTime: 2022-07-15 16:12:24
 * @FilePath: \generate-cli\lib\util\createManually.js
 */

const { chalk, download } = require("../share-util")

module.exports = async (type, { name, packages, manager, languageType }) => {
  console.log()
  console.log(`✨  Creating project in ${process.cwd()}.`)
  console.log(`🗃  Initializing git repository...`)
  console.log(`⚙️  Installing CLI plugins. This might take a while...`)
  console.log()

  const outputPath = `${process.cwd()}/${name}`
  const branch = languageType === "js" ? "#js" : ""
  await download(`${type}-builder${branch}`, name)

  const managerName = manager.toLocaleLowerCase()
  let packageManagerCommand = managerName.includes("yarn")
    ? "yarn add"
    : "npm i"
  await require("./installPackages")(
    type,
    packages,
    packageManagerCommand,
    outputPath
  )
  // 写入文件
  await require("./writeEntry")(type, packages, outputPath)
  console.log()
  console.log(chalk.blueBright(`  cd ${name}`))
  console.log(chalk.blueBright("  " + getCommand(type, managerName)))
  console.log()
}

function getCommand(type, managerName) {
  let command = managerName.split(' ')[1] + " "
  if (!managerName.includes("yarn")) command += "run "
  command += type === "vite" ? "dev" : "serve"
  return command
}
