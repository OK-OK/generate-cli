/*
 * @Author: JL Guan
 * @Date: 2020-12-01 17:44:41
 * @description: create manually cli
 * @LastEditTime: 2021-04-27 17:02:26
 * @FilePath: \mine\generate-cli\lib\util\createManually.js
 */

const { fs, path, chalk } = require('../share-util')

module.exports = async (type, { name, packages, manager }) => {
    console.log()
    console.log(`✨  Creating project in ${process.cwd()}.`)
    console.log(`🗃  Initializing git repository...`)
    console.log(`⚙️  Installing CLI plugins. This might take a while...`)
    console.log();
    // 判断是否uni-app ts
    const isUniTs = () => {
        if (type !== 'uni-app') return '';
        const tsIndex = packages.indexOf('typescript');
        tsIndex !== -1 && packages.splice(tsIndex, 1)
        return `/${tsIndex !== -1 ? 'ts' : 'js'}`
    }
    const templatePath = path.resolve(__dirname, `../../template/${type}${isUniTs()}`)
    const outputPath = `${process.cwd()}/${name}`
    await fs.copy(templatePath, outputPath)
    const managerName = manager.toLocaleLowerCase()
    let packageManagerCommand = managerName.includes('yarn') ? 'yarn add' : 'npm i'
    // it系统设置
    if (packages.includes('@it/fk-it-component') && !packages.includes('@fk/faicomponent')) packages.push('@fk/faicomponent')
    await require('./installPackages')(type, packages, packageManagerCommand, outputPath);
    // 写入文件
    await require('./writeEntry')(type, packages, outputPath)
    console.log()
    console.log(chalk.blueBright(`  cd ${name}`))
    console.log(chalk.blueBright('  ' + (managerName.includes('yarn') ? 'yarn start' : 'npm start')))
    console.log()
}