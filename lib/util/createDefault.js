/*
 * @Author: JL Guan
 * @Date: 2020-12-01 17:44:49
 * @description: create default cli
 * @LastEditTime: 2022-07-14 15:17:52
 * @FilePath: \generate-cli\lib\util\createDefault.js
 */

const { commands, execa } = require('../share-util');

module.exports = async (type, { name, manager }) => {
    const c = commands.get(type) + name;
    console.log()
    console.log('wait...')
    console.log()
    try {
        await execa.command(c, { stdio: 'inherit' })
    } catch (error) {
        console.log()
        console.log('installing @vue/cli')
        console.log()
        if (type === 'vue' || type === 'uni-app') {
            await execa.command(
                `${manager && manager.toLocaleLowerCase().includes('yarn')
                    ? 'yarn global add'
                    : 'npm i -g'
                } @vue/cli@latest`,
                { stdio: 'inherit' }
            )
        }
        execa(c, { stdio: 'inherit' })
    }
}