/*
 * @Author: JL Guan
 * @Date: 2020-12-02 10:43:11
 * @description: file description
 * @LastEditTime: 2021-01-11 10:08:26
 * @FilePath: \mine\generate-cli\lib\util\createManually.js
 */
/*
 * @Author: JL Guan
 * @Date: 2020-12-01 17:44:41
 * @description: file description
 * @LastEditTime: 2021-01-08 17:32:10
 * @FilePath: \mine\generate-cli\lib\util\createManually.js
 */

const { fs, path, execa, chalk } = require('../share-util')

module.exports = async (type, { name, packages, manager }) => {
    console.log()
    console.log(`✨  Creating project in ${process.cwd()}.`)
    console.log(`🗃  Initializing git repository...`)
    console.log(`⚙️  Installing CLI plugins. This might take a while...`)
    console.log();
    const templatePath = path.resolve(__dirname, `../../template/${type}`)
    const outputPath = `${process.cwd()}/${name}`
    await fs.copy(templatePath, outputPath)
    const managerName = manager.toLocaleLowerCase()
    let packageManagerCommand = managerName.includes('yarn') ? 'yarn add ' : 'npm i '
    // 是否fnpm内模块
    if (packages === '@fk/faicomponent' || packages === '@it/fk-it-component') {
        packageManagerCommand = 'fnpm i -S '
        try {
            await execa.command('fnpm')
        } catch (error) {
            await execa.command('npm install -g @fk/fnpm --registry=http://registry.npm.faidev.cc')
        }
        if (packages === '@it/fk-it-component') await execa.command(`${packageManagerCommand}@fk/faicomponent`, { cwd: outputPath })
    }
    await execa.command(`${packageManagerCommand}${packages}`, { cwd: outputPath })
    // 写入文件
    await require('./writeEntry')(type, packages, outputPath)
    console.log(chalk.blueBright(`  cd ${name}`))
    console.log(chalk.blueBright('  ' + (managerName.includes('yarn') ? 'yarn serve' : 'npm run serve')))
    console.log()
}