/*
 * @Author: JL Guan
 * @Date: 2020-12-02 10:43:11
 * @description: config
 * @LastEditTime: 2022-07-15 11:48:12
 * @FilePath: \generate-cli\lib\util\config.js
 */
const version = require("../../package.json").version
const projectName = "generate-cli"
const commands = new Map([
  ["vue", "vue create "],
  ["react", "npx create-react-app "],
  ["vite", "npm init vite@latest "],
  ["uni-app", "vue create -p dcloudio/uni-preset-vue "]
])
const packageList = require("./packageList")
module.exports = {
  version,
  projectName,
  commands,
  packageList
}
