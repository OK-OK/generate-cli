/*
 * @Author: JL Guan
 * @Date: 2021-01-08 18:01:38
 * @description: write vue main.js
 * @LastEditTime: 2022-07-15 15:08:17
 * @FilePath: \generate-cli\lib\util\writeEntry.js
 */
const { fs, packageList } = require("../share-util")

const lessStr = `css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  }`

const getOutputContent = {
  vue(packages, mainContent, outputPath) {
    // vue.config.js
    if (packages.includes("less")) {
      const configPath = `${outputPath}/vue.config.js`
      const configContent = fs.readFileSync(configPath, "utf-8")
      fs.writeFile(configPath, configContent.replace("// css", lessStr))
    }
    // main.js
    let importContent = ""
    let vueUseContent = ""
    packages.forEach(package => {
      const o = packageList.vue
        .concat(packageList.public)
        .find(it => it.name === package)
      if (o.vueUse) {
        importContent += `import ${o.importName} from '${package}';\n`
        vueUseContent += `Vue.use(${o.importName});\n`
        o.importList?.forEach(t => {
          importContent += `import '${t}';\n`
        })
      }
    })
    const outputContent = `${importContent}\n${vueUseContent}\nVue.config.productionTip = false;`
    return mainContent.replace(
      `\nVue.config.productionTip = false;`,
      outputContent
    )
  }
}

module.exports = async (type, packages, outputPath) => {
  if (!getOutputContent[type]) return
  const mainPath = `${outputPath}/src/main.js`
  const mainContent = fs.readFileSync(mainPath, "utf-8")
  const outputContent = getOutputContent[type](
    packages,
    mainContent,
    outputPath
  )
  await fs.writeFile(mainPath, outputContent)
}
