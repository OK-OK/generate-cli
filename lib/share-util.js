/*
 * @Author: JL Guan
 * @Date: 2020-07-09 13:48:24
 * @LastEditTime: 2020-12-01 17:44:05
 * @Description: file description
 * @FilePath: \mine\generate-cli\lib\share-util.js
 */

['config'].forEach(m =>
    Object.assign(exports, require(`./util/${m}`))
)

exports.fs = require('fs-extra')
exports.chalk = require('chalk')
exports.execa = require('execa')
