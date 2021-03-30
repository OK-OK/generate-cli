/*
 * @Author: JL Guan
 * @Date: 2021-01-14 15:34:24
 * @description: install package
 * @LastEditTime: 2021-03-30 15:11:49
 * @FilePath: \mine\generate-cli\lib\util\installPackages.js
 */
const { execa, packageList } = require('../share-util')

module.exports = async (type, packages, packageManagerCommand, outputPath) => {
    // 是否存在fnpm内模块
    if (packages.includes('@fk/faicomponent')) {
        packageManagerCommand = 'fnpm i'
    }
    for (const package of packages) {
        const o = packageList[type].concat(packageList.public).find(p => p.name === package)
        // o.dev是否devDependencies模块
        await execa.command(`${packageManagerCommand} ${o.packages ? [package, ...o.packages].join(' ') : package} ${o.dev ? ' -D' : ''} `, { cwd: outputPath })
    }
}