/*
 * @Author: JL Guan
 * @Date: 2020-12-02 10:43:11
 * @description: config
 * @LastEditTime: 2021-01-15 14:09:46
 * @FilePath: \mine\generate-cli\lib\util\config.js
 */
const version = require('../../package.json').version;
const projectName = 'generate-cli';
const commands = new Map([
    ['vue', 'vue create '],
    ['react', 'npx create-react-app '],
    ['vite', 'npm init vite-app '],
    ['uni-app', 'vue create -p dcloudio/uni-preset-vue ']
]);
const packageList = require('./packageList')
const packageQuestions = [
    {
        when: ({ type, preset }) => type === 'vue' && !preset.includes('default'),
        type: 'checkbox',
        message: 'Check the features needed for your project: ',
        name: 'packages',
        choices: packageList['vue'],
    }
]

module.exports = {
    version,
    projectName,
    commands,
    packageQuestions,
    packageList
}