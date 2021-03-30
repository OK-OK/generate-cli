/*
 * @Author: JL Guan
 * @Date: 2020-12-02 10:43:11
 * @description: config
 * @LastEditTime: 2021-03-30 14:25:50
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
        when: ({ preset }) => !preset.includes('default'),
        type: 'checkbox',
        message: 'Check the features needed for your project: ',
        name: 'packages',
        choices: ({ type }) => packageList[type].concat(packageList['public']),
    }
]

module.exports = {
    version,
    projectName,
    commands,
    packageQuestions,
    packageList
}