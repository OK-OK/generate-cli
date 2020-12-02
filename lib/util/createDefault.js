/*
 * @Author: JL Guan
 * @Date: 2020-12-01 17:44:49
 * @description: file description
 * @LastEditTime: 2020-12-01 17:56:28
 * @FilePath: \mine\generate-cli\lib\util\createDefault.js
 */

const { execSync } = require('child_process');
const { commands } = require('../share-util');

module.exports = (type, { name, preset }) => {
    const c = commands.get(type) + name;
    console.log()
    console.log('wait...')
    console.log()
    try {
        execSync(c, { stdio: 'inherit' })
    } catch (error) {
        console.log()
        console.log('installing @vue/cli')
        console.log()
        if (type === 'vue' || type === 'uni-app') {
            execSync('npm i @vue/cli -g', { stdio: 'inherit' })
        }
        execSync(c, { stdio: 'inherit' })
    }
}