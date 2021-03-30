/*
 * @Author: JL Guan
 * @Date: 2021-03-12 10:29:44
 * @description: file description
 * @LastEditTime: 2021-03-30 11:40:16
 * @FilePath: \mine\generate-cli\template\uni-app\uni-app\vue.config.js
 */
const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);

process.env.UNI_OUTPUT_DIR = resolve('dist');

module.exports = {
    configureWebpack: {
        devtool: process.env.NODE_ENV === 'development' && 'eval-cheap-module-source-map',
    }
};