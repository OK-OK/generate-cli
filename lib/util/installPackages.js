/*
 * @Author: JL Guan
 * @Date: 2021-01-14 15:34:24
 * @description: install package
 * @LastEditTime: 2021-04-27 17:43:14
 * @FilePath: \mine\generate-cli\lib\util\installPackages.js
 */
const { execa, packageList, ora } = require('../share-util')

module.exports = async (type, packages, packageManagerCommand, outputPath) => {
    // 是否存在fnpm内模块
    if (packages.includes('@fk/faicomponent')) {
        packageManagerCommand = 'fnpm i'
    }
    const spinner = ora(' Loading packages').start();
    const install = async (installList, isDev) => {
        spinner.text = ' Installing ' + installList.join(' ');
        await execa.command(`${packageManagerCommand} ${installList.join(' ')} ${isDev ? ' -D' : ''} `, { cwd: outputPath })
    }
    for (const package of packages) {
        const o = packageList[type].concat(packageList.public).find(p => p.name === package)
        // o.dev是否devDependencies模块
        await install([package, ...(o?.packages ?? [])], o?.dev);
    }
    spinner.text = ' Installing node_modules';
    await execa.command(packageManagerCommand.includes('yarn') ? 'yarn' : packageManagerCommand, { cwd: outputPath });
    spinner.stop();
    console.log();
    console.log(' Installed all packages success!');
}