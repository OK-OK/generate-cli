/*
 * @Author: JL Guan
 * @Date: 2020-12-01 17:44:49
 * @description: file description
 * @LastEditTime: 2020-12-02 11:40:27
 * @FilePath: \generate-cli\lib\util\createDefault.js
 */

const { commands, execa } = require('../share-util');

module.exports = (type, { name, preset }) => {
    const c = commands.get(type) + name;
    console.log()
    console.log('wait...')
    console.log()
    try {
        execa(c, { stdio: 'inherit' })
    } catch (error) {
        console.log()
        console.log('installing @vue/cli')
        console.log()
        if (type === 'vue' || type === 'uni-app') {
            execa('npm i @vue/cli -g', { stdio: 'inherit' })
        }
        execa(c, { stdio: 'inherit' })
    }
}