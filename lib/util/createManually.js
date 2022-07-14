/*
 * @Author: JL Guan
 * @Date: 2020-12-01 17:44:41
 * @description: create manually cli
 * @LastEditTime: 2022-07-14 14:42:51
 * @FilePath: \generate-cli\lib\util\createManually.js
 */

const { fs, path, chalk, execa, download } = require("../share-util")

module.exports = async (type, { name, packages, manager, viteType }) => {
  console.log()
  console.log(`✨  Creating project in ${process.cwd()}.`)
  console.log(`🗃  Initializing git repository...`)
  console.log(`⚙️  Installing CLI plugins. This might take a while...`)
  console.log()
  console.log()
  const outputPath = `${process.cwd()}/${name}`
  // 使用 GitHub 项目
  if (viteType === "ts") {
    await new Promise(resolve =>
      download("OK-OK/vite-builder", outputPath, { clone: true }, resolve)
    )
  } else {
    // 判断是否uni-app ts
    const isUniTs = () => {
      if (type !== "uni-app") return ""
      const tsIndex = packages.indexOf("typescript")
      tsIndex !== -1 && packages.splice(tsIndex, 1)
      return `/${tsIndex !== -1 ? "ts" : "js"}`
    }
    const templatePath = path.resolve(
      __dirname,
      `../../template/${type}${isUniTs()}`
    )
    await fs.copy(templatePath, outputPath)
  }
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
  console.log(
    chalk.blueBright(
      "  " + (managerName.includes("yarn") ? "yarn start" : "npm start")
    )
  )
  console.log()
}
