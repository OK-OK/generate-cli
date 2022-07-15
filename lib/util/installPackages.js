/*
 * @Author: JL Guan
 * @Date: 2021-01-14 15:34:24
 * @description: install package
 * @LastEditTime: 2022-07-15 15:43:30
 * @FilePath: \generate-cli\lib\util\installPackages.js
 */
const { execa, packageList, ora } = require("../share-util")

module.exports = async (type, packages, packageManagerCommand, outputPath) => {
  const spinner = ora(" Loading packages").start()
  const install = async (installList, isDev) => {
    spinner.text = " Installing " + installList.join(" ")
    await execa.command(
      `${packageManagerCommand} ${installList.join(" ")} ${
        isDev ? " -D" : ""
      } `,
      { cwd: outputPath }
    )
  }
  for (const package of packages) {
    const o = packageList[type]
      .concat(packageList.public)
      .find(p => p.name === package)
    // o.dev是否devDependencies模块
    await install([package, ...(o?.packages ?? [])], o?.dev)
  }
  spinner.text = " Installing node_modules"
  await execa.command(
    packageManagerCommand.includes("yarn") ? "yarn" : packageManagerCommand,
    { cwd: outputPath }
  )
  spinner.stop()
  console.log()
  console.log(" Installed all packages success!")
}
